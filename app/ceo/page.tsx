'use client';
import { DEPARTMENTS } from '@/lib/data';
import { useTaskStore } from '@/lib/store';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatDate, daysUntil, cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Clock, TrendingDown } from 'lucide-react';
import type { Task } from '@/lib/data';

const EVENT_DATE = new Date('2026-10-07');

function daysToEvent() {
  return Math.max(0, Math.round((EVENT_DATE.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
}

function StatusBadge({ status }: { status: Task['status'] }) {
  const map: Record<Task['status'], string> = {
    not_started: 'bg-slate-100 text-slate-600',
    in_progress: 'bg-blue-100 text-blue-700',
    blocked: 'bg-red-100 text-red-700',
    review: 'bg-amber-100 text-amber-700',
    done: 'bg-green-100 text-green-700',
  };
  const labels: Record<Task['status'], string> = {
    not_started: 'To do',
    in_progress: 'In Progress',
    blocked: 'Blocked',
    review: 'Review',
    done: 'Done',
  };
  return (
    <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full', map[status])}>
      {labels[status]}
    </span>
  );
}

export default function CeoPage() {
  const { tasks, loading } = useTaskStore();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 text-sm animate-pulse">Loading…</div>
      </div>
    );
  }

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const pctComplete = total ? Math.round((done / total) * 100) : 0;
  const activeBlockers = tasks.filter((t) => t.status === 'blocked').length;
  const now = new Date();
  const overdue = tasks.filter((t) => t.status !== 'done' && new Date(t.dueDate) < now).length;

  const blockedTasks = tasks.filter((t) => t.status === 'blocked');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">CEO Overview</h1>
        <p className="text-sm text-slate-500 mt-0.5">Read-only executive summary — IMC 2026</p>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard label="Total Tasks" value={String(total)} sub="across all departments" color="blue" />
        <MetricCard label="% Complete" value={`${pctComplete}%`} sub={`${done} of ${total} done`} color="green" progress={pctComplete} />
        <MetricCard label="Active Blockers" value={String(activeBlockers)} sub="need resolution" color={activeBlockers > 0 ? 'red' : 'green'} />
        <MetricCard label="Days to Event" value={String(daysToEvent())} sub="until Oct 7, 2026" color="violet" />
      </div>

      {/* Department Cards */}
      <section className="mb-10">
        <h2 className="text-base font-semibold text-slate-700 mb-4">Department Status</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {DEPARTMENTS.map((dept) => {
            const deptTasks = tasks.filter((t) => t.department === dept.id);
            const deptDone = deptTasks.filter((t) => t.status === 'done').length;
            const deptBlocked = deptTasks.filter((t) => t.status === 'blocked').length;
            const deptOverdue = deptTasks.filter(
              (t) => t.status !== 'done' && new Date(t.dueDate) < now
            ).length;
            const pct = deptTasks.length ? Math.round((deptDone / deptTasks.length) * 100) : 0;
            const topUrgent = [...deptTasks]
              .filter((t) => t.status !== 'done')
              .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .slice(0, 3);

            return (
              <div key={dept.id} className="bg-white border border-slate-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: dept.color }} />
                    <span className="font-semibold text-slate-800 text-sm">{dept.name}</span>
                  </div>
                  <span className="text-xs text-slate-400">{pct}% done</span>
                </div>
                <div className="text-xs text-slate-400 mb-3">Lead: {dept.lead}</div>
                <ProgressBar value={pct} color="bg-blue-500" className="mb-3" />
                <div className="flex gap-3 text-xs mb-4">
                  {deptBlocked > 0 && (
                    <span className="flex items-center gap-1 text-red-600 font-medium">
                      <AlertCircle className="w-3 h-3" /> {deptBlocked} blocked
                    </span>
                  )}
                  {deptOverdue > 0 && (
                    <span className="flex items-center gap-1 text-amber-600 font-medium">
                      <Clock className="w-3 h-3" /> {deptOverdue} overdue
                    </span>
                  )}
                  {deptBlocked === 0 && deptOverdue === 0 && (
                    <span className="flex items-center gap-1 text-emerald-600">
                      <CheckCircle2 className="w-3 h-3" /> On track
                    </span>
                  )}
                </div>
                {topUrgent.length > 0 && (
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-2">
                      Most Urgent
                    </div>
                    <div className="space-y-1.5">
                      {topUrgent.map((t) => (
                        <div key={t.id} className="flex items-center justify-between gap-2">
                          <span className="text-xs text-slate-700 truncate">{t.title}</span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] text-slate-400">{formatDate(t.dueDate)}</span>
                            <StatusBadge status={t.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Blockers Feed */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingDown className="w-4 h-4 text-red-500" />
          <h2 className="text-base font-semibold text-slate-700">Blockers Feed</h2>
          {blockedTasks.length > 0 && (
            <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
              {blockedTasks.length} blocked
            </span>
          )}
        </div>
        {blockedTasks.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-xl p-10 text-center">
            <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm text-slate-500">No blocked tasks across all departments</p>
          </div>
        ) : (
          <div className="space-y-3">
            {blockedTasks.map((task) => {
              const dept = DEPARTMENTS.find((d) => d.id === task.department);
              const days = daysUntil(task.dueDate);
              return (
                <div key={task.id} className="bg-white border border-red-100 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{task.title}</div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        {dept && (
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: dept.color }}
                          >
                            {dept.name}
                          </span>
                        )}
                        <span className="text-xs text-slate-400">
                          {task.assignees.join(', ')}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 shrink-0">
                      {Math.abs(days)}d {days < 0 ? 'overdue' : 'remaining'}
                    </div>
                  </div>
                  {task.blocked_reason ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm text-red-700 font-medium">
                      🚨 {task.blocked_reason}
                    </div>
                  ) : (
                    <div className="text-xs text-red-400 italic">No reason provided</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function MetricCard({
  label, value, sub, color, progress,
}: {
  label: string; value: string; sub: string; color: string; progress?: number;
}) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-600',
    green: 'text-emerald-600',
    red: 'text-red-600',
    violet: 'text-violet-600',
  };
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-4">
      <div className="text-xs font-medium text-slate-500 mb-1">{label}</div>
      <div className={cn('text-3xl font-bold mb-0.5', colorMap[color] || 'text-slate-900')}>
        {value}
      </div>
      <div className="text-xs text-slate-400">{sub}</div>
      {progress !== undefined && (
        <ProgressBar value={progress} className="mt-2" color="bg-emerald-500" />
      )}
    </div>
  );
}
