'use client';
import { Task, DEPARTMENTS } from '@/lib/data';
import { statusColor, statusLabel, priorityColor, priorityLabel, formatDate, daysUntil, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { AvatarGroup } from '@/components/ui/Avatar';
import { AlertCircle, Clock, Link2, CheckSquare } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  showDept?: boolean;
}

export function TaskCard({ task, onClick, showDept = false }: TaskCardProps) {
  const days = daysUntil(task.dueDate);
  const isOverdue = days < 0 && task.status !== 'done';
  const isDueSoon = days >= 0 && days <= 3 && task.status !== 'done';
  const dept = DEPARTMENTS.find((d) => d.id === task.department);
  const completedSubs = task.subtasks.filter((s) => s.done).length;

  return (
    <div
      onClick={onClick}
      className={cn(
        'group bg-white border rounded-lg p-3.5 cursor-pointer hover:shadow-md transition-all duration-150 hover:border-slate-300',
        task.status === 'blocked' && 'border-red-200 bg-red-50/30',
        task.status === 'done' && 'opacity-70'
      )}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          {showDept && dept && (
            <div
              className="text-[10px] font-semibold uppercase tracking-wide mb-1"
              style={{ color: dept.color }}
            >
              {dept.name}
            </div>
          )}
          <h4 className={cn('text-sm font-medium text-slate-800 leading-snug', task.status === 'done' && 'line-through text-slate-500')}>
            {task.title}
          </h4>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <Badge className={priorityColor(task.priority)}>{priorityLabel(task.priority)}</Badge>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2 mb-2.5">
        <Badge className={statusColor(task.status)}>{statusLabel(task.status)}</Badge>
        {task.status === 'blocked' && (
          <span className="flex items-center gap-1 text-red-600 text-xs font-medium">
            <AlertCircle className="w-3 h-3" /> Blocked
          </span>
        )}
        {task.dependencies.length > 0 && (
          <span className="flex items-center gap-1 text-slate-400 text-xs">
            <Link2 className="w-3 h-3" /> {task.dependencies.length} dep
          </span>
        )}
        {task.subtasks.length > 0 && (
          <span className="flex items-center gap-1 text-slate-400 text-xs">
            <CheckSquare className="w-3 h-3" /> {completedSubs}/{task.subtasks.length}
          </span>
        )}
      </div>

      {/* Subtask progress */}
      {task.subtasks.length > 0 && (
        <div className="mb-2.5">
          <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-400 rounded-full transition-all"
              style={{ width: `${(completedSubs / task.subtasks.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between">
        <AvatarGroup names={task.assignees} max={3} />
        <div className={cn('flex items-center gap-1 text-xs', isOverdue ? 'text-red-600 font-medium' : isDueSoon ? 'text-amber-600 font-medium' : 'text-slate-400')}>
          <Clock className="w-3 h-3" />
          {isOverdue
            ? `${Math.abs(days)}d overdue`
            : days === 0
            ? 'Due today'
            : `${days}d left`}
        </div>
      </div>
    </div>
  );
}
