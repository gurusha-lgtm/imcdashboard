'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTaskStore } from '@/lib/store';
import { useAuth } from '@/lib/auth';
import { DEPARTMENTS } from '@/lib/data';
import { StatusPill } from '@/components/dashboard/StatusPill';
import { formatDate, daysUntil, cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, CheckCircle2, User } from 'lucide-react';
import type { Task } from '@/lib/data';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function dueThisWeek(tasks: Task[]) {
  const now = new Date();
  const end = new Date();
  end.setDate(end.getDate() + 7);
  return tasks.filter(
    (t) => t.status !== 'done' && new Date(t.dueDate) >= now && new Date(t.dueDate) <= end
  ).length;
}

export default function MyTasksPage() {
  const { tasks, updateTask } = useTaskStore();
  const { user } = useAuth();
  const router = useRouter();
  const [completedOpen, setCompletedOpen] = useState(false);

  // Redirect leads/ceo away (members only for primary redirect, but page is accessible to all)
  if (!user) return null;

  const myTasks = tasks
    .filter((t) => t.assignees.includes(user.name))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const active = myTasks.filter((t) => t.status !== 'done');
  const completed = myTasks.filter((t) => t.status === 'done');
  const weekCount = dueThisWeek(myTasks);

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Greeting */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {greeting()}, {user.name.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {active.length} task{active.length !== 1 ? 's' : ''} active
          {weekCount > 0 && `, ${weekCount} due this week`}
        </p>
      </div>

      {/* Active tasks */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-widest mb-3">
          Active ({active.length})
        </h2>
        {active.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
            <p className="font-semibold text-slate-700">All caught up!</p>
            <p className="text-sm text-slate-400 mt-1">No active tasks assigned to you right now.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {active.map((task) => (
              <TaskMyCard key={task.id} task={task} onUpdate={(status, blockedReason) =>
                updateTask(task.id, { status, blocked_reason: status === 'blocked' ? blockedReason : undefined }, {
                  blockedReason,
                  userName: user.name,
                })
              } />
            ))}
          </div>
        )}
      </section>

      {/* Completed tasks */}
      {completed.length > 0 && (
        <section>
          <button
            onClick={() => setCompletedOpen((v) => !v)}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-widest mb-3 w-full text-left hover:text-slate-700"
          >
            {completedOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            Completed ({completed.length})
          </button>
          {completedOpen && (
            <div className="space-y-3">
              {completed.map((task) => (
                <TaskMyCard key={task.id} task={task} onUpdate={(status, blockedReason) =>
                  updateTask(task.id, { status, blocked_reason: status === 'blocked' ? blockedReason : undefined }, {
                    blockedReason,
                    userName: user.name,
                  })
                } />
              ))}
            </div>
          )}
        </section>
      )}

      {myTasks.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-2xl p-10 text-center">
          <User className="w-8 h-8 text-slate-300 mx-auto mb-3" />
          <p className="font-semibold text-slate-700">No tasks assigned to you</p>
          <p className="text-sm text-slate-400 mt-1">
            Tasks assigned to {user.name} will appear here. Check with your team lead.
          </p>
        </div>
      )}
    </div>
  );
}

function TaskMyCard({ task, onUpdate }: { task: Task; onUpdate: (status: Task['status'], blockedReason?: string) => void }) {
  const days = daysUntil(task.dueDate);
  const isOverdue = days < 0 && task.status !== 'done';
  const isDueSoon = days >= 0 && days <= 3 && task.status !== 'done';
  const dept = DEPARTMENTS.find((d) => d.id === task.department);

  return (
    <div className={cn(
      'bg-white border rounded-2xl p-4',
      task.status === 'blocked' ? 'border-red-200' : 'border-slate-100',
      task.status === 'done' && 'opacity-60'
    )}>
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className={cn(
          'text-base font-bold text-slate-900 leading-snug',
          task.status === 'done' && 'line-through text-slate-400'
        )}>
          {task.title}
        </h3>
        {dept && (
          <span
            className="shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
            style={{ backgroundColor: dept.color }}
          >
            {dept.name}
          </span>
        )}
      </div>

      <div className={cn(
        'text-xs font-medium mb-3',
        isOverdue ? 'text-red-600' : isDueSoon ? 'text-amber-600' : 'text-slate-400'
      )}>
        Due {formatDate(task.dueDate)}
        {isOverdue && ` · ${Math.abs(days)}d overdue`}
        {isDueSoon && !isOverdue && days === 0 && ' · Due today'}
        {isDueSoon && !isOverdue && days > 0 && ` · ${days}d left`}
      </div>

      <StatusPill task={task} size="md" onUpdate={onUpdate} />

      {task.status === 'blocked' && task.blocked_reason && (
        <div className="mt-2 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          🚨 <span className="font-medium">Blocked:</span> {task.blocked_reason}
        </div>
      )}
    </div>
  );
}
