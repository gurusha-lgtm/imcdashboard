import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  let body: { taskId?: string; newStatus?: string; blockedReason?: string; userId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { taskId, newStatus, blockedReason, userId } = body;

  if (!taskId || !newStatus) {
    return NextResponse.json({ error: 'taskId and newStatus are required' }, { status: 400 });
  }

  const validStatuses = ['not_started', 'in_progress', 'blocked', 'review', 'done'];
  if (!validStatuses.includes(newStatus)) {
    return NextResponse.json({ error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }, { status: 400 });
  }

  // Fetch current task to get comments
  const { data: existing, error: fetchError } = await supabase
    .from('tasks')
    .select('comments')
    .eq('id', taskId)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 });
  }

  const updatePayload: Record<string, unknown> = { status: newStatus };

  if (newStatus === 'blocked' && blockedReason) {
    updatePayload.blocked_reason = blockedReason;
    const autoComment = {
      id: `br_${Date.now()}`,
      author: userId || 'WhatsApp',
      text: `🚨 Blocked: ${blockedReason}`,
      timestamp: new Date().toISOString().split('T')[0],
    };
    const existingComments = (existing.comments as unknown[]) || [];
    updatePayload.comments = [...existingComments, autoComment];
  }

  const { data, error } = await supabase
    .from('tasks')
    .update(updatePayload)
    .eq('id', taskId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, task: data });
}
