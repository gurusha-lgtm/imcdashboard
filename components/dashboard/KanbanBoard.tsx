'use client';
import { useState } from 'react';
import { Task, Status, DEPARTMENTS } from '@/lib/data';
import { statusLabel, cn } from '@/lib/utils';
import { TaskCard } from './TaskCard';
import { TaskDetailModal } from './TaskDetailModal';

const COLUMNS: Status[] = ['not_started', 'in_progress', 'blocked', 'review', 'done'];

const COLUMN_STYLES: Record<Status, string> = {
  not_started: 'bg-slate-50 border-slate-200',
  in_progress: 'bg-blue-50/50 border-blue-200',
  blocked: 'bg-red-50/50 border-red-200',
  review: 'bg-amber-50/50 border-amber-200',
  done: 'bg-green-50/30 border-green-200',
};

const COLUMN_HEADER: Record<Status, string> = {
  not_started: 'text-slate-500',
  in_progress: 'text-blue-600',
  blocked: 'text-red-600',
  review: 'text-amber-600',
  done: 'text-green-600',
};

interface Props {
  tasks: Task[];
  showDept?: boolean;
}

export function KanbanBoard({ tasks, showDept = false }: Props) {
  const [selected, setSelected] = useState<Task | null>(null);

  const columns = COLUMNS.map((status) => ({
    status,
    tasks: tasks.filter((t) => t.status === status),
  }));

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 min-h-[400px]">
        {columns.map(({ status, tasks: colTasks }) => (
          <div
            key={status}
            className={cn('flex-shrink-0 w-72 rounded-xl border p-3', COLUMN_STYLES[status])}
          >
            <div className={cn('flex items-center justify-between mb-3', COLUMN_HEADER[status])}>
              <span className="text-xs font-semibold uppercase tracking-wide">
                {statusLabel(status)}
              </span>
              <span className="text-xs font-medium bg-white/80 px-1.5 py-0.5 rounded-full border border-current/20">
                {colTasks.length}
              </span>
            </div>
            <div className="space-y-2">
              {colTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  showDept={showDept}
                  onClick={() => setSelected(task)}
                />
              ))}
              {colTasks.length === 0 && (
                <div className="text-center py-8 text-xs text-slate-300">No tasks</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <TaskDetailModal
          task={selected}
          onClose={() => setSelected(null)}
          onNavigate={(id) => {
            const t = tasks.find((x) => x.id === id);
            if (t) setSelected(t);
          }}
        />
      )}
    </>
  );
}
