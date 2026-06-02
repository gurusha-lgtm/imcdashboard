'use client';
import { use, useState } from 'react';
import { DEPARTMENTS } from '@/lib/data';
import { useTaskStore } from '@/lib/store';
import { KanbanBoard } from '@/components/dashboard/KanbanBoard';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { TaskDetailModal } from '@/components/dashboard/TaskDetailModal';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';
import { healthColor, statusColor, statusLabel, formatDate, cn } from '@/lib/utils';
import {
  TrendingUp, Mic, Megaphone, Newspaper, Landmark, Settings, Rocket, DollarSign,
  LayoutGrid, List, Filter,
} from 'lucide-react';
import type { Task, Department } from '@/lib/data';

const ICONS: Record<string, React.ElementType> = {
  TrendingUp, Mic, Megaphone, Newspaper, Landmark, Settings, Rocket, DollarSign,
};

export default function DepartmentPage({ params }: { params: Promise<{ dept: string }> }) {
  const { dept: deptId } = use(params);
  const dept = DEPARTMENTS.find((d) => d.id === deptId);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [selected, setSelected] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { tasks: allTasks } = useTaskStore();

  if (!dept) return <div className="p-8 text-slate-500">Department not found.</div>;

  const tasks = allTasks.filter((t) => t.department === dept.id);
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const blocked = tasks.filter((t) => t.status === 'blocked').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const overdue = tasks.filter((t) => t.status !== 'done' && new Date(t.dueDate) < new Date()).length;
  const progress = total ? Math.round((done / total) * 100) : 0;
  let healthVal: 'on-track' | 'at-risk' | 'blocked';
  if (blocked > 0 || overdue > 1) healthVal = 'blocked';
  else if (overdue > 0 || (total > 0 && done / total < 0.3 && inProgress < 2)) healthVal = 'at-risk';
  else healthVal = 'on-track';
  const stats = { total, done, blocked, inProgress, overdue, health: healthVal, progress };

  const Icon = ICONS[dept.icon] || Settings;

  const filteredTasks = statusFilter === 'all'
    ? tasks
    : tasks.filter((t) => t.status === statusFilter);

  const crossDeps = tasks
    .flatMap((t) => t.dependencies.map((depId) => {
      const depTask = allTasks.find((x) => x.id === depId);
      if (depTask && depTask.department !== dept.id) return { task: t, depTask };
      return null;
    }))
    .filter(Boolean) as { task: Task; depTask: Task }[];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: dept.color + '15' }}
            >
              <Icon className="w-6 h-6" style={{ color: dept.color }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{dept.name}</h1>
              <p className="text-sm text-slate-500">{dept.description}</p>
            </div>
          </div>
          <span className={cn('text-sm font-semibold px-3 py-1.5 rounded-full', healthColor(stats.health))}>
            {stats.health === 'on-track' ? 'On Track' : stats.health === 'at-risk' ? 'At Risk' : 'Blocked'}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-100 rounded-xl p-4">
          <div className="text-2xl font-bold text-slate-900">{stats.progress}%</div>
          <div className="text-xs text-slate-400 mb-2">{stats.done}/{stats.total} tasks</div>
          <ProgressBar value={stats.progress} color={`bg-[${dept.color}]`} />
        </div>
        <div className="bg-white border border-slate-100 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
          <div className="text-xs text-slate-400">In Progress</div>
        </div>
        <div className={cn('border rounded-xl p-4', stats.blocked > 0 ? 'bg-red-50 border-red-100' : 'bg-white border-slate-100')}>
          <div className={cn('text-2xl font-bold', stats.blocked > 0 ? 'text-red-600' : 'text-slate-300')}>{stats.blocked}</div>
          <div className="text-xs text-slate-400">Blocked</div>
        </div>
        <div className="bg-white border border-slate-100 rounded-xl p-4">
          <div className={cn('text-2xl font-bold', stats.overdue > 0 ? 'text-orange-500' : 'text-slate-300')}>{stats.overdue}</div>
          <div className="text-xs text-slate-400">Overdue</div>
        </div>
      </div>

      {/* Team members */}
      <div className="bg-white border border-slate-100 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Team</span>
          {dept.members.map((member) => (
            <div key={member} className="flex items-center gap-1.5">
              <Avatar name={member} size="xs" />
              <span className="text-xs text-slate-600">
                {member}
                {member === dept.lead && <span className="ml-1 text-[10px] text-slate-400">(lead)</span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-team dependencies */}
      {crossDeps.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
          <h3 className="text-sm font-semibold text-amber-800 mb-3">
            Cross-team Dependencies ({crossDeps.length})
          </h3>
          <div className="space-y-2">
            {crossDeps.map(({ task, depTask }) => {
              const depDept = DEPARTMENTS.find((d) => d.id === depTask.department)!;
              return (
                <div key={`${task.id}-${depTask.id}`} className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-slate-700 truncate max-w-xs">{task.title}</span>
                  <span className="text-slate-400">→ needs</span>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: depDept.color }}
                  >
                    {depDept.name}
                  </span>
                  <span className="text-slate-600 truncate">{depTask.title}</span>
                  <span className={cn('text-xs px-1.5 py-0.5 rounded', statusColor(depTask.status))}>
                    {statusLabel(depTask.status)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View toggle + filter */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 gap-1">
          <button
            onClick={() => setView('kanban')}
            className={cn('p-1.5 rounded transition-colors', view === 'kanban' ? 'bg-slate-100 text-slate-700' : 'text-slate-400 hover:text-slate-600')}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('list')}
            className={cn('p-1.5 rounded transition-colors', view === 'list' ? 'bg-slate-100 text-slate-700' : 'text-slate-400 hover:text-slate-600')}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {['all', 'not_started', 'in_progress', 'blocked', 'review', 'done'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-medium transition-colors',
                statusFilter === s ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              )}
            >
              {s === 'all' ? 'All' : statusLabel(s as any)}
            </button>
          ))}
        </div>
      </div>

      {/* Board */}
      {view === 'kanban' ? (
        <KanbanBoard tasks={filteredTasks} />
      ) : (
        <ListView tasks={filteredTasks} onSelect={setSelected} />
      )}

      {selected && (
        <TaskDetailModal
          task={selected}
          onClose={() => setSelected(null)}
          onNavigate={(id) => {
            const t = allTasks.find((x) => x.id === id);
            if (t) setSelected(t);
          }}
        />
      )}
    </div>
  );
}

function ListView({ tasks, onSelect }: { tasks: Task[]; onSelect: (t: Task) => void }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] text-xs font-semibold text-slate-400 uppercase tracking-wide px-4 py-3 border-b border-slate-100">
        <span>Task</span>
        <span>Status</span>
        <span>Priority</span>
        <span>Assignee</span>
        <span>Due</span>
      </div>
      <div className="divide-y divide-slate-50">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors items-center"
            onClick={() => onSelect(task)}
          >
            <div>
              <div className="text-sm font-medium text-slate-700 truncate">{task.title}</div>
              {task.subtasks.length > 0 && (
                <div className="text-xs text-slate-400">
                  {task.subtasks.filter((s) => s.done).length}/{task.subtasks.length} subtasks
                </div>
              )}
            </div>
            <span className={cn('text-xs px-2 py-0.5 rounded-md font-medium w-fit', statusColor(task.status))}>
              {statusLabel(task.status)}
            </span>
            <span className="text-xs text-slate-500 capitalize">{task.priority}</span>
            <div className="flex items-center gap-1">
              {task.assignees.slice(0, 2).map((a) => (
                <Avatar key={a} name={a} size="xs" />
              ))}
            </div>
            <span className="text-xs text-slate-500">{formatDate(task.dueDate)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
