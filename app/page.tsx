'use client';
import { useState } from 'react';
import {
  DEPARTMENTS, TASKS,
  getDepartmentStats, getUpcomingDeadlines, getBlockedTasks,
  getMilestones, getRecentActivity, EVENT_DATE_VALUE,
} from '@/lib/data';
import { DeptCard } from '@/components/dashboard/DeptCard';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { TaskDetailModal } from '@/components/dashboard/TaskDetailModal';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { formatDate, healthColor, statusColor, statusLabel, cn } from '@/lib/utils';
import {
  AlertCircle, Clock, CheckCircle2, TrendingUp,
  Flag, Activity, Calendar,
} from 'lucide-react';
import type { Task } from '@/lib/data';

export default function HomePage() {
  const [selected, setSelected] = useState<Task | null>(null);

  const upcoming = getUpcomingDeadlines(21);
  const blocked = getBlockedTasks();
  const milestones = getMilestones();
  const recent = getRecentActivity(6);

  const totalTasks = TASKS.length;
  const doneTasks = TASKS.filter((t) => t.status === 'done').length;
  const inProgressTasks = TASKS.filter((t) => t.status === 'in_progress').length;
  const blockedTasks = TASKS.filter((t) => t.status === 'blocked').length;
  const overallProgress = Math.round((doneTasks / totalTasks) * 100);

  const eventDate = new Date(EVENT_DATE_VALUE());
  const daysToEvent = Math.max(0, Math.round((eventDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">IMC 2026 Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">India Mobile Congress — Central Project Workspace</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">Event Date</div>
          <div className="text-sm font-semibold text-slate-700">{formatDate(EVENT_DATE_VALUE())}</div>
          <div className="text-lg font-bold text-blue-600">{daysToEvent} days</div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Activity className="w-4 h-4 text-blue-500" />}
          label="Overall Progress"
          value={`${overallProgress}%`}
          sub={`${doneTasks} of ${totalTasks} tasks done`}
          progress={overallProgress}
          progressColor="bg-blue-500"
        />
        <StatCard
          icon={<Clock className="w-4 h-4 text-violet-500" />}
          label="In Progress"
          value={String(inProgressTasks)}
          sub="tasks active now"
        />
        <StatCard
          icon={<AlertCircle className="w-4 h-4 text-red-500" />}
          label="Blocked"
          value={String(blockedTasks)}
          sub="need immediate attention"
          alert={blockedTasks > 0}
        />
        <StatCard
          icon={<Flag className="w-4 h-4 text-violet-500" />}
          label="Milestones"
          value={`${milestones.filter((m) => m.status === 'done').length}/${milestones.length}`}
          sub="milestones completed"
        />
      </div>

      {/* Department Grid */}
      <section className="mb-8">
        <h2 className="text-base font-semibold text-slate-700 mb-3">Department Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {DEPARTMENTS.map((dept) => (
            <DeptCard key={dept.id} dept={dept} />
          ))}
        </div>
      </section>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blocked tasks */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <h2 className="text-base font-semibold text-slate-700">Blocked Tasks</h2>
            {blocked.length > 0 && (
              <span className="ml-auto text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-medium">
                {blocked.length}
              </span>
            )}
          </div>
          {blocked.length === 0 ? (
            <EmptyState icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />} text="No blocked tasks" />
          ) : (
            <div className="space-y-2">
              {blocked.map((task) => (
                <TaskCard key={task.id} task={task} showDept onClick={() => setSelected(task)} />
              ))}
            </div>
          )}
        </div>

        {/* Upcoming deadlines */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-amber-500" />
            <h2 className="text-base font-semibold text-slate-700">Upcoming (21 days)</h2>
            <span className="ml-auto text-xs bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded-full font-medium">
              {upcoming.length}
            </span>
          </div>
          {upcoming.length === 0 ? (
            <EmptyState icon={<CheckCircle2 className="w-6 h-6 text-emerald-400" />} text="Nothing due soon" />
          ) : (
            <div className="space-y-2">
              {upcoming.slice(0, 6).map((task) => (
                <TaskCard key={task.id} task={task} showDept onClick={() => setSelected(task)} />
              ))}
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <h2 className="text-base font-semibold text-slate-700">Recent Activity</h2>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl divide-y divide-slate-50">
            {recent.map((task) => {
              const lastComment = task.comments[task.comments.length - 1];
              return (
                <div
                  key={task.id}
                  className="p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => setSelected(task)}
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-700 truncate">{task.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5 truncate">
                        {lastComment.author}: {lastComment.text}
                      </div>
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
        <TaskDetailModal
          task={selected}
          onClose={() => setSelected(null)}
          onNavigate={(id) => {
            const t = TASKS.find((x) => x.id === id);
            if (t) setSelected(t);
          }}
        />
      )}
    </div>
  );
}

function StatCard({
  icon, label, value, sub, progress, progressColor, alert,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  progress?: number;
  progressColor?: string;
  alert?: boolean;
}) {
  return (
    <div className={cn('bg-white border rounded-xl p-4', alert ? 'border-red-100' : 'border-slate-100')}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-0.5">{value}</div>
      <div className="text-xs text-slate-400">{sub}</div>
      {progress !== undefined && (
        <ProgressBar value={progress} className="mt-2" color={progressColor} />
      )}
    </div>
  );
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-8 flex flex-col items-center gap-2">
      {icon}
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}
