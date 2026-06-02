'use client';
import { Task, DEPARTMENTS, TASKS, getTaskById } from '@/lib/data';
import {
  statusColor, statusLabel, priorityColor, priorityLabel,
  formatDate, daysUntil, cn, DEPT_COLORS,
} from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import {
  X, Clock, Link2, CheckSquare, MessageSquare, AlertCircle,
  Calendar, Tag, Users, FileText, ArrowRight,
} from 'lucide-react';

interface Props {
  task: Task;
  onClose: () => void;
  onNavigate?: (taskId: string) => void;
}

export function TaskDetailModal({ task, onClose, onNavigate }: Props) {
  const dept = DEPARTMENTS.find((d) => d.id === task.department)!;
  const days = daysUntil(task.dueDate);
  const completedSubs = task.subtasks.filter((s) => s.done).length;

  const dependencyTasks = task.dependencies.map((id) => getTaskById(id)).filter(Boolean) as Task[];
  const blockedByThis = TASKS.filter((t) => t.dependencies.includes(task.id));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
                style={{ backgroundColor: dept.color + '20', color: dept.color }}
              >
                {dept.name}
              </span>
              <span className="text-xs text-slate-400 font-mono">{task.id}</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 leading-snug">{task.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="px-6 py-4 space-y-5">
            {/* Status row */}
            <div className="flex flex-wrap gap-2 items-center">
              <Badge className={statusColor(task.status)}>{statusLabel(task.status)}</Badge>
              <Badge className={priorityColor(task.priority)}>{priorityLabel(task.priority)}</Badge>
              {task.milestone && (
                <Badge className="bg-violet-100 text-violet-700">Milestone</Badge>
              )}
              {task.status === 'blocked' && (
                <span className="flex items-center gap-1 text-red-600 text-xs font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> Blocked
                </span>
              )}
            </div>

            {/* Description */}
            {task.description && (
              <div>
                <p className="text-sm text-slate-600 leading-relaxed">{task.description}</p>
              </div>
            )}

            {/* Notes */}
            {task.notes && (
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 mb-1">
                  <FileText className="w-3.5 h-3.5" /> Notes
                </div>
                <p className="text-sm text-amber-800">{task.notes}</p>
              </div>
            )}

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    <Calendar className="w-3 h-3" /> Due Date
                  </div>
                  <div className={cn('font-medium', days < 0 && task.status !== 'done' ? 'text-red-600' : 'text-slate-700')}>
                    {formatDate(task.dueDate)}
                    {task.status !== 'done' && (
                      <span className="ml-1.5 text-xs font-normal text-slate-400">
                        ({days < 0 ? `${Math.abs(days)}d ago` : days === 0 ? 'today' : `in ${days}d`})
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    <Tag className="w-3 h-3" /> Tags
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {task.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <Users className="w-3 h-3" /> Assignees
                </div>
                <div className="space-y-1.5">
                  {task.assignees.map((name) => (
                    <div key={name} className="flex items-center gap-2">
                      <Avatar name={name} size="xs" />
                      <span className="text-sm text-slate-700">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Subtasks */}
            {task.subtasks.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  <CheckSquare className="w-3 h-3" /> Subtasks ({completedSubs}/{task.subtasks.length})
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(completedSubs / task.subtasks.length) * 100}%` }}
                  />
                </div>
                <div className="space-y-2">
                  {task.subtasks.map((sub) => (
                    <div key={sub.id} className="flex items-center gap-2.5">
                      <div className={cn(
                        'w-4 h-4 rounded border flex items-center justify-center shrink-0',
                        sub.done ? 'bg-blue-500 border-blue-500' : 'border-slate-300'
                      )}>
                        {sub.done && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 12">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={cn('text-sm', sub.done ? 'line-through text-slate-400' : 'text-slate-700')}>
                        {sub.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Dependencies */}
            {(dependencyTasks.length > 0 || blockedByThis.length > 0) && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  <Link2 className="w-3 h-3" /> Dependencies
                </div>
                {dependencyTasks.length > 0 && (
                  <div className="mb-2">
                    <div className="text-xs text-slate-400 mb-1">This task depends on:</div>
                    <div className="space-y-1.5">
                      {dependencyTasks.map((dep) => {
                        const depDept = DEPARTMENTS.find((d) => d.id === dep.department)!;
                        return (
                          <button
                            key={dep.id}
                            onClick={() => onNavigate?.(dep.id)}
                            className="w-full flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-left transition-colors"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: depDept.color }}
                            />
                            <span className="text-xs font-mono text-slate-400">{dep.id}</span>
                            <span className="text-sm text-slate-700 flex-1 truncate">{dep.title}</span>
                            <Badge className={statusColor(dep.status)}>{statusLabel(dep.status)}</Badge>
                            <ArrowRight className="w-3 h-3 text-slate-300" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {blockedByThis.length > 0 && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Blocking:</div>
                    <div className="space-y-1.5">
                      {blockedByThis.map((dep) => {
                        const depDept = DEPARTMENTS.find((d) => d.id === dep.department)!;
                        return (
                          <button
                            key={dep.id}
                            onClick={() => onNavigate?.(dep.id)}
                            className="w-full flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-left transition-colors"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: depDept.color }}
                            />
                            <span className="text-xs font-mono text-slate-400">{dep.id}</span>
                            <span className="text-sm text-slate-700 flex-1 truncate">{dep.title}</span>
                            <Badge className={statusColor(dep.status)}>{statusLabel(dep.status)}</Badge>
                            <ArrowRight className="w-3 h-3 text-slate-300" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Comments */}
            {task.comments.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  <MessageSquare className="w-3 h-3" /> Comments ({task.comments.length})
                </div>
                <div className="space-y-3">
                  {task.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2.5">
                      <Avatar name={comment.author} size="xs" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold text-slate-700">{comment.author}</span>
                          <span className="text-xs text-slate-400">{formatDate(comment.timestamp)}</span>
                        </div>
                        <p className="text-sm text-slate-600">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
