'use client';
import { useState } from 'react';
import { TASKS, DEPARTMENTS, Task, EVENT_DATE_VALUE } from '@/lib/data';
import { statusColor, statusLabel, formatDate, daysUntil, cn, DEPT_COLORS } from '@/lib/utils';
import { TaskDetailModal } from './TaskDetailModal';
import { Flag, Calendar } from 'lucide-react';

export function Timeline() {
  const [selected, setSelected] = useState<Task | null>(null);
  const [filterDept, setFilterDept] = useState<string>('all');

  const eventDate = new Date(EVENT_DATE_VALUE());

  // Build weeks: 12 weeks before event to event day
  const weeks: Date[] = [];
  for (let w = 12; w >= 0; w--) {
    const d = new Date(eventDate);
    d.setDate(d.getDate() - w * 7);
    weeks.push(d);
  }

  const filteredTasks = TASKS.filter((t) => {
    if (filterDept !== 'all' && t.department !== filterDept) return false;
    return t.milestone || t.priority === 'critical' || t.status === 'blocked';
  });

  function weekIndex(dateStr: string): number {
    const d = new Date(dateStr);
    const msPerWeek = 7 * 24 * 60 * 60 * 1000;
    const idx = Math.floor((d.getTime() - weeks[0].getTime()) / msPerWeek);
    return Math.max(0, Math.min(12, idx));
  }

  // Group tasks by department for rows
  const depts = filterDept === 'all'
    ? DEPARTMENTS
    : DEPARTMENTS.filter((d) => d.id === filterDept);

  return (
    <>
      {/* Filter bar */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilterDept('all')}
          className={cn(
            'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
            filterDept === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          )}
        >
          All Teams
        </button>
        {DEPARTMENTS.map((d) => (
          <button
            key={d.id}
            onClick={() => setFilterDept(d.id)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              filterDept === d.id ? 'text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
            style={filterDept === d.id ? { backgroundColor: d.color } : {}}
          >
            {d.name}
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        {/* Week header */}
        <div className="overflow-x-auto">
          <div style={{ minWidth: '900px' }}>
            <div className="flex border-b border-slate-100">
              <div className="w-40 shrink-0 px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide border-r border-slate-100">
                Department
              </div>
              <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(13, 1fr)` }}>
                {weeks.map((w, i) => {
                  const isEventWeek = i === 12;
                  const now = new Date();
                  const isCurrentWeek = w <= now && new Date(w.getTime() + 7 * 24 * 60 * 60 * 1000) > now;
                  return (
                    <div
                      key={i}
                      className={cn(
                        'px-1 py-2 text-center border-r border-slate-50',
                        isEventWeek && 'bg-red-50',
                        isCurrentWeek && 'bg-blue-50'
                      )}
                    >
                      <div className={cn(
                        'text-[10px] font-medium',
                        isEventWeek ? 'text-red-600 font-bold' : isCurrentWeek ? 'text-blue-600' : 'text-slate-400'
                      )}>
                        {isEventWeek ? (
                          <span className="flex flex-col items-center gap-0.5">
                            <Flag className="w-3 h-3" />
                            <span>EVENT</span>
                          </span>
                        ) : (
                          <>
                            <div>{w.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</div>
                            {isCurrentWeek && <div className="text-[9px]">← now</div>}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Department rows */}
            {depts.map((dept) => {
              const deptTasks = filteredTasks.filter((t) => t.department === dept.id);
              return (
                <div key={dept.id} className="flex border-b border-slate-50 hover:bg-slate-50/50 min-h-[56px]">
                  <div className="w-40 shrink-0 px-4 py-3 border-r border-slate-100 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: dept.color }} />
                    <span className="text-xs font-medium text-slate-700 leading-tight">{dept.name}</span>
                  </div>
                  <div className="flex-1 grid relative py-2" style={{ gridTemplateColumns: `repeat(13, 1fr)` }}>
                    {/* Column backgrounds */}
                    {weeks.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'border-r border-slate-50',
                          i === 12 && 'bg-red-50/50'
                        )}
                      />
                    ))}
                    {/* Task pills overlaid */}
                    <div className="absolute inset-0 flex items-center px-1 gap-1 flex-wrap py-1">
                      {deptTasks.map((task) => {
                        const wi = weekIndex(task.dueDate);
                        const colWidth = 100 / 13;
                        return (
                          <button
                            key={task.id}
                            onClick={() => setSelected(task)}
                            title={`${task.title} — Due ${formatDate(task.dueDate)}`}
                            className={cn(
                              'absolute top-2 h-6 rounded px-1.5 text-[10px] font-medium text-white truncate hover:opacity-90 transition-opacity flex items-center gap-1',
                              task.status === 'blocked' && 'ring-1 ring-red-400 ring-offset-1'
                            )}
                            style={{
                              left: `${wi * colWidth + 0.5}%`,
                              maxWidth: `${colWidth * 1.8}%`,
                              backgroundColor: dept.color,
                              opacity: task.status === 'done' ? 0.5 : 1,
                            }}
                          >
                            {task.milestone && <Flag className="w-2.5 h-2.5 shrink-0" />}
                            <span className="truncate">{task.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Flag className="w-3 h-3 text-violet-500" /> Milestone</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm border border-red-400" /> Blocked</span>
          <span className="flex items-center gap-1 text-blue-600"><Calendar className="w-3 h-3" /> Current week highlighted</span>
          <span className="flex items-center gap-1 text-red-600"><Flag className="w-3 h-3" /> Event Day: {formatDate(EVENT_DATE_VALUE())}</span>
          <span className="text-slate-400 ml-auto">Showing: milestones, critical tasks & blocked tasks</span>
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
    </>
  );
}
