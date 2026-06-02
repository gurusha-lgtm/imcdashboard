'use client';
import { useState } from 'react';
import { DEPARTMENTS, EVENT_DATE_VALUE } from '@/lib/data';
import { useTaskStore } from '@/lib/store';
import { DeptCard } from '@/components/dashboard/DeptCard';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { TaskDetailModal } from '@/components/dashboard/TaskDetailModal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatDate, healthColor, cn } from '@/lib/utils';
import { AlertCircle, Clock, CheckCircle2, TrendingUp, Flag, Activity } from 'lucide-react';
import type { Task } from '@/lib/data';

export default function HomePage() {
  const { tasks, loading } = useTaskStore();
  const [selected, setSelected] = useState<Task | null>(null);

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const blockedTasks = tasks.filter((t) => t.status === 'blocked').length;
  const overallProgress = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const milestones = tasks.filter((t) => t.milestone);

  const now = new Date();
  const future = new Date();
  future.setDate(future.getDate() + 21);
  const upcoming = tasks
    .filter((t) => t.status !== 'done' && new Date(t.dueDate) >= now && new Date(t.dueDate) <= future)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const blocked = tasks.filter((t) => t.status === 'blocked');

  const recent = [...tasks]
    .filter((t) => t.comments.length > 0)
    .sort((a, b) =>
      new Date(b.comments[b.comments.length - 1].timestamp).getTime() -
      new Date(a.comments[a.comments.length - 1].timestamp).getTime()
    )
    .slice(0, 6);

  const eventDate = new Date(EVENT_DATE_VALUE());
  const daysToEvent = Math.max(0, Math.round((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 text-sm animate-pulse">Loading dashboard…</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">IMC 2026 Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">India Mobile Congress — Central Project Workspace</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Event Dates</div>
          <div className="text-sm font-semibold text-slate-700">7–10 Oct 2026, Yashobhoomi</div>
          <div className="text-lg font-bold text-blue-600">{daysToEvent} days</div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={<Activity className="w-4 h-4 text-blue-500" />} label="Overall Progress"
          value={`${overallProgress}%`} sub={`${doneTasks} of ${totalTasks} tasks done`}
          progress={overallProgress} progressColor="bg-blue-500" />
        <StatCard icon={<Clock className="w-4 h-4 text-violet-500" />} label="In Progress"
          value={String(inProgressTasks)} sub="tasks active now" />
        <StatCard icon={<AlertCircle className="w-4 h-4 text-red-500" />} label="Blocked"
          value={String(blockedTasks)} sub="need immediate attention" alert={blockedTasks > 0} />
        <StatCard icon={<Flag className="w-4 h-4 text-violet-500" />} label="Milestones"
          value={`${milestones.filter((m) => m.status === 'done').length}/${milestones.length}`}
          sub="milestones completed" />
      </div>

      {/* Department Grid */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-slate-700 mb-3">Department Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DEPARTMENTS.map((dept) => <DeptCard key={dept.id} dept={dept} />)}
        </div>
      </section>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <h2 className="text-base font-semibold text-slate-700">Blocked Tasks</h2>
            {blocked.length > 0 && <span className="ml-auto text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">{blocked.length}</span>}
          </div>
          {blocked.length === 0
            ? <EmptyState icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />} text="No blocked tasks" />
            : <div className="space-y-2">{blocked.map((task) => <TaskCard key={task.id} task={task} showDept onClick={() => setSelected(task)} />)}</div>}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-amber-500" />
            <h2 className="text-base font-semibold text-slate-700">Upcoming (21 days)</h2>
            <span className="ml-auto text-xs bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full font-medium">{upcoming.length}</span>
          </div>
          {upcoming.length === 0
            ? <EmptyState icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />} text="Nothing due soon" />
            : <div className="space-y-2">{upcoming.slice(0, 6).map((task) => <TaskCard key={task.id} task={task} showDept onClick={() => setSelected(task)} />)}</div>}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <h2 className="text-base font-semibold text-slate-700">Recent Activity</h2>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl divide-y divide-slate-50">
            {recent.length === 0
              ? <div className="p-6 text-center text-sm text-slate-400">No recent activity</div>
              : recent.map((task) => {
                  const lastComment = task.comments[task.comments.length - 1];
                  return (
                    <div key={task.id} className="p-3 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => setSelected(task)}>
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-slate-700 truncate">{task.title}</div>
                          <div className="text-xs text-slate-400 mt-0.5 truncate">{lastComment.author}: {lastComment.text}</div>
                        </div>
                        <div className="text-[10px] text-slate-300 shrink-0">{formatDate(lastComment.timestamp)}</div>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>

      {selected && (
        <TaskDetailModal task={selected} onClose={() => setSelected(null)}
          onNavigate={(id) => { const t = tasks.find((x) => x.id === id); if (t) setSelected(t); }} />
      )}
    </div>
  );
}

function StatCard({ icon, label, value, sub, progress, progressColor, alert }: {
  icon: React.ReactNode; label: string; value: string; sub: string;
  progress?: number; progressColor?: string; alert?: boolean;
}) {
  return (
    <div className={cn('bg-white border rounded-xl p-4', alert ? 'border-red-100' : 'border-slate-100')}>
      <div className="flex items-center gap-2 mb-2">{icon}<span className="text-xs font-medium text-slate-500">{label}</span></div>
      <div className="text-2xl font-bold text-slate-900 mb-0.5">{value}</div>
      <div className="text-xs text-slate-400">{sub}</div>
      {progress !== undefined && <ProgressBar value={progress} className="mt-2" color={progressColor} />}
    </div>
  );
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-8 flex flex-col items-center gap-2">
      {icon}<p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}
