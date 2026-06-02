'use client';
import { useState } from 'react';
import { Task, DEPARTMENTS, TASKS, getTaskById } from '@/lib/data';
import { useTaskStore } from '@/lib/store';
import {
  statusColor, statusLabel, priorityColor, priorityLabel,
  formatDate, daysUntil, cn, DEPT_COLORS,
} from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import {
  X, Clock, Link2, CheckSquare, MessageSquare, AlertCircle,
  Calendar, Tag, Users, FileText, ArrowRight, Send, ChevronDown,
} from 'lucide-react';

const STATUSES: Task['status'][] = ['not_started', 'in_progress', 'review', 'blocked', 'done'];
const PRIORITIES: Task['priority'][] = ['critical', 'high', 'medium', 'low'];

interface Props {
  task: Task;
  onClose: () => void;
  onNavigate?: (taskId: string) => void;
}

export function TaskDetailModal({ task, onClose, onNavigate }: Props) {
  const { updateTask, addComment, toggleSubtask, tasks } = useTaskStore();
  const [commentText, setCommentText] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [saving, setSaving] = useState(false);

  const dept = DEPARTMENTS.find((d) => d.id === task.department)!;
  const days = daysUntil(task.dueDate);
  const completedSubs = task.subtasks.filter((s) => s.done).length;

  // Use live task from store if available
  const liveTask = tasks.find((t) => t.id === task.id) || task;
  const dependencyTasks = liveTask.dependencies.map((id) => tasks.find((t) => t.id === id)).filter(Boolean) as Task[];
  const blockedByThis = tasks.filter((t) => t.dependencies.includes(liveTask.id));

  async function handleStatusChange(status: Task['status']) {
    setSaving(true);
    await updateTask(liveTask.id, { status });
    setSaving(false);
  }

  async function handlePriorityChange(priority: Task['priority']) {
    setSaving(true);
    await updateTask(liveTask.id, { priority });
    setSaving(false);
  }

  async function handleSubtaskToggle(subtaskId: string) {
    await toggleSubtask(liveTask.id, subtaskId);
  }

  async function handleAddComment() {
    if (!commentText.trim() || !commentAuthor.trim()) return;
    setSaving(true);
    await addComment(liveTask.id, commentAuthor.trim(), commentText.trim());
    setCommentText('');
    setSaving(false);
  }

  const completedSubsLive = liveTask.subtasks.filter((s) => s.done).length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[82vh] overflow-hidden flex flex-col"
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
              <span className="text-xs text-slate-400 font-mono">{liveTask.id}</span>
              {saving && <span className="text-xs text-blue-500 animate-pulse">Saving…</span>}
            </div>
            <h2 className="text-lg font-semibold text-slate-900 leading-snug">{liveTask.title}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="px-6 py-4 space-y-5">

            {/* Status & Priority — editable */}
            <div className="flex flex-wrap gap-3">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Status</div>
                <div className="relative">
                  <select
                    value={liveTask.status}
                    onChange={(e) => handleStatusChange(e.target.value as Task['status'])}
                    className={cn('appearance-none pl-2 pr-7 py-1 rounded-md text-xs font-medium cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-blue-300', statusColor(liveTask.status))}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{statusLabel(s)}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-60" />
                </div>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Priority</div>
                <div className="relative">
                  <select
                    value={liveTask.priority}
                    onChange={(e) => handlePriorityChange(e.target.value as Task['priority'])}
                    className={cn('appearance-none pl-2 pr-7 py-1 rounded-md text-xs font-medium cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-blue-300', priorityColor(liveTask.priority))}
                  >
                    {PRIORITIES.map((p) => (
                      <option key={p} value={p}>{priorityLabel(p)}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-current opacity-60" />
                </div>
              </div>
              {liveTask.milestone && <Badge className="bg-violet-100 text-violet-700 self-end mb-0.5">Milestone</Badge>}
            </div>

            {/* Description */}
            {liveTask.description && (
              <p className="text-sm text-slate-600 leading-relaxed">{liveTask.description}</p>
            )}

            {/* Notes */}
            {liveTask.notes && (
              <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 mb-1">
                  <FileText className="w-3.5 h-3.5" /> Notes
                </div>
                <p className="text-sm text-amber-800">{liveTask.notes}</p>
              </div>
            )}

            {/* Meta grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    <Calendar className="w-3 h-3" /> Due Date
                  </div>
                  <div className={cn('font-medium', days < 0 && liveTask.status !== 'done' ? 'text-red-600' : 'text-slate-700')}>
                    {formatDate(liveTask.dueDate)}
                    {liveTask.status !== 'done' && (
                      <span className="ml-1.5 text-xs font-normal text-slate-400">
                        ({days < 0 ? `${Math.abs(days)}d overdue` : days === 0 ? 'today' : `in ${days}d`})
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                    <Tag className="w-3 h-3" /> Tags
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {liveTask.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
                  <Users className="w-3 h-3" /> Assignees
                </div>
                <div className="space-y-1.5">
                  {liveTask.assignees.map((name) => (
                    <div key={name} className="flex items-center gap-2">
                      <Avatar name={name} size="xs" />
                      <span className="text-sm text-slate-700">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Subtasks — interactive */}
            {liveTask.subtasks.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                  <CheckSquare className="w-3 h-3" /> Subtasks ({completedSubsLive}/{liveTask.subtasks.length})
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full mb-3 overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${liveTask.subtasks.length ? (completedSubsLive / liveTask.subtasks.length) * 100 : 0}%` }}
                  />
                </div>
                <div className="space-y-2">
                  {liveTask.subtasks.map((sub) => (
                    <button
                      key={sub.id}
                      className="flex items-center gap-2.5 w-full text-left group"
                      onClick={() => handleSubtaskToggle(sub.id)}
                    >
                      <div className={cn(
                        'w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors',
                        sub.done ? 'bg-blue-500 border-blue-500' : 'border-slate-300 group-hover:border-blue-300'
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
                    </button>
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
                          <button key={dep.id} onClick={() => onNavigate?.(dep.id)}
                            className="w-full flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-left transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: depDept.color }} />
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
                          <button key={dep.id} onClick={() => onNavigate?.(dep.id)}
                            className="w-full flex items-center gap-2 p-2 rounded-lg border border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-left transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: depDept.color }} />
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
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                <MessageSquare className="w-3 h-3" /> Comments ({liveTask.comments.length})
              </div>
              {liveTask.comments.length > 0 && (
                <div className="space-y-3 mb-4">
                  {liveTask.comments.map((comment) => (
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
              )}

              {/* Add comment */}
              <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment…"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!commentText.trim() || !commentAuthor.trim() || saving}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
