import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function parseIncoming(body: Record<string, string>) {
  // WATI format: { waId, text }
  if (body.waId) {
    return { phone: `+${body.waId}`, message: body.text || '' };
  }
  // Twilio format: { From: "whatsapp:+91...", Body: "..." }
  const phone = (body.From || '').replace('whatsapp:', '');
  return { phone, message: body.Body || '' };
}

function twiml(msg: string) {
  const safe = msg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return new NextResponse(
    `<?xml version="1.0"?><Response><Message>${safe}</Message></Response>`,
    { headers: { 'Content-Type': 'text/xml' } }
  );
}

function detectStatus(text: string): Task['status'] | null {
  const t = text.toLowerCase();
  if (/\b(done|complete|completed|finished|finish|wrapped)\b/.test(t)) return 'done';
  if (/\b(blocked|stuck|waiting|pending|cannot|cant|can't|holding)\b/.test(t)) return 'blocked';
  if (/\b(started|working|in progress|began|begin|starting|wip|ongoing)\b/.test(t)) return 'in_progress';
  if (/\b(review|reviewing|checking|under review|for review)\b/.test(t)) return 'review';
  return null;
}

function fuzzyMatch(tasks: Task[], query: string): Task | null {
  const statusWords = /\b(done|complete|completed|finished|finish|wrapped|blocked|stuck|waiting|pending|cannot|cant|can't|holding|started|working|in progress|began|begin|starting|wip|ongoing|review|reviewing|checking)\b/gi;
  const cleaned = query.toLowerCase().replace(statusWords, '').replace(/\s+/g, ' ').trim();
  if (!cleaned || cleaned.length < 3) return null;

  let best: Task | null = null;
  let bestScore = 0;

  for (const task of tasks) {
    const title = task.title.toLowerCase();
    let score = 0;
    if (title === cleaned) {
      score = 100;
    } else if (title.includes(cleaned)) {
      score = 85;
    } else {
      const words = cleaned.split(/\s+/).filter((w) => w.length > 2);
      if (words.length > 0) {
        const matched = words.filter((w) => title.includes(w));
        score = Math.round((matched.length / words.length) * 70);
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = task;
    }
  }

  return bestScore >= 30 ? best : null;
}

type Task = {
  id: string;
  title: string;
  assignees: string[];
  status: 'not_started' | 'in_progress' | 'blocked' | 'review' | 'done';
  comments: Array<{ id: string; author: string; text: string; timestamp: string }>;
  blocked_reason?: string;
};

export async function POST(req: NextRequest) {
  let body: Record<string, string> = {};

  const ct = req.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    body = await req.json();
  } else {
    const text = await req.text();
    new URLSearchParams(text).forEach((v, k) => { body[k] = v; });
  }

  const { phone, message } = parseIncoming(body);
  if (!phone) return twiml('Could not read your number. Please try again.');

  const msg = message.trim();
  if (!msg) return twiml('Send a message like: "print brief done" or "agency blocked not responding"');

  // Look up registered user
  const { data: users } = await supabase
    .from('users')
    .select('*')
    .eq('whatsapp_number', phone)
    .limit(1);

  const user = users?.[0] as { id: string; name: string; department_id: string } | undefined;

  // Registration flow
  const registerMatch = msg.match(/^register\s+(.+)$/i);
  if (!user) {
    if (registerMatch) {
      const nameQuery = registerMatch[1].trim();
      const { data: matches } = await supabase
        .from('users')
        .select('*')
        .ilike('name', nameQuery)
        .limit(1);

      if (!matches || matches.length === 0) {
        return twiml(`No team member found named "${nameQuery}".\n\nCheck spelling and try again.\nExample: register Priya Sharma`);
      }

      const matched = matches[0] as { id: string; name: string; department_id: string };
      await supabase
        .from('users')
        .update({ whatsapp_number: phone })
        .eq('id', matched.id);

      const { data: myTasks } = await supabase
        .from('tasks')
        .select('title')
        .contains('assignees', [matched.name]);

      const taskList = myTasks?.map((t: { title: string }) => `• ${t.title}`).join('\n') || 'No tasks assigned yet.';

      return twiml(
        `✓ Registered as ${matched.name} (${matched.department_id}).\n\nYour tasks:\n${taskList}\n\nTo update: "[task name] done/blocked/started"`
      );
    }

    return twiml(
      `You're not registered yet.\n\nSend: *register [your full name]*\n\nExample: register Priya Sharma`
    );
  }

  // Detect status keyword
  const newStatus = detectStatus(msg);
  if (!newStatus) {
    return twiml(
      `Hi ${user.name}! Use keywords:\n• "done" / "finished"\n• "blocked" / "stuck"\n• "started" / "working on"\n• "review"\n\nExample: "print brief done"`
    );
  }

  // Get user's tasks
  const { data: userTasks } = await supabase
    .from('tasks')
    .select('id,title,assignees,status,comments,blocked_reason')
    .contains('assignees', [user.name]);

  if (!userTasks || userTasks.length === 0) {
    return twiml(`No tasks found assigned to ${user.name}.`);
  }

  const matched = fuzzyMatch(userTasks as Task[], msg);

  if (!matched) {
    const suggestions = (userTasks as Task[]).slice(0, 4).map((t) => `• ${t.title}`).join('\n');
    return twiml(
      `Couldn't match that to a task. Include part of the task name.\n\nYour tasks:\n${suggestions}\n\nExample: "vendor contracts done"`
    );
  }

  // Build update payload
  const updates: Record<string, unknown> = { status: newStatus };

  if (newStatus === 'blocked') {
    const reason = msg
      .replace(/\b(blocked|stuck|waiting|pending|cannot|cant|can't|holding)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim() || 'Blocked — no reason provided';
    updates.blocked_reason = reason;

    const existingComments = (matched.comments as Task['comments']) || [];
    updates.comments = [
      ...existingComments,
      {
        id: `wa_${Date.now()}`,
        author: user.name,
        text: `🚨 Blocked via WhatsApp: ${reason}`,
        timestamp: new Date().toISOString().split('T')[0],
      },
    ];
  } else {
    updates.blocked_reason = null;
  }

  await supabase.from('tasks').update(updates).eq('id', matched.id);

  const labels: Record<string, string> = {
    done: 'Done ✓',
    blocked: 'Blocked 🚨',
    in_progress: 'In Progress 🔄',
    review: 'In Review 👀',
    not_started: 'To Do',
  };

  return twiml(`✓ "${matched.title}" → ${labels[newStatus]}. Updated on dashboard.`);
}
