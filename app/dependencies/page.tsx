'use client';
import { useState } from 'react';
import { TASKS, DEPARTMENTS, getTaskById } from '@/lib/data';
import { TaskDetailModal } from '@/components/dashboard/TaskDetailModal';
import { statusColor, statusLabel, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, AlertTriangle, Link2 } from 'lucide-react';
import type { Task } from '@/lib/data';

export default function DependenciesPage() {
  const [selected, setSelected] = useState<Task | null>(null);

  // Find all cross-team dependencies
  const crossDeps = TASKS.flatMap((task) =>
    task.dependencies
      .map((depId) => {
        const depTask = getTaskById(depId);
        if (!depTask || depTask.department === task.department) return null;
        return { task, depTask };
      })
      .filter(Boolean)
  ) as { task: Task; depTask: Task }[];

  // Group by blocking department pair
  const groups: Record<string, { task: Task; depTask: Task }[]> = {};
  for (const dep of crossDeps) {
    const key = `${dep.depTask.department}→${dep.task.department}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(dep);
  }

  const blockedChain = TASKS.filter(
    (t) =>
      t.status !== 'done' &&
      t.dependencies.some((depId) => {
        const dep = getTaskById(depId);
        return dep && (dep.status === 'blocked' || dep.status === 'not_started');
      })
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Cross-Team Dependencies</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Tasks that depend on deliverables from other departments
        </p>
      </div>

      {/* Risk alert */}
      {blockedChain.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-amber-800 mb-1">
              {blockedChain.length} tasks at risk due to incomplete dependencies
            </div>
            <div className="flex flex-wrap gap-1.5">
              {blockedChain.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full hover:bg-amber-200 transition-colors"
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Dependency groups */}
      <div className="space-y-6">
        {Object.entries(groups).map(([key, deps]) => {
          const [fromId, toId] = key.split('→');
          const fromDept = DEPARTMENTS.find((d) => d.id === fromId)!;
          const toDept = DEPARTMENTS.find((d) => d.id === toId)!;

          return (
            <div key={key} className="bg-white border border-slate-100 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: fromDept.color }}
                >
                  {fromDept.name}
                </span>
                <ArrowRight className="w-4 h-4 text-slate-300" />
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: toDept.color }}
                >
                  {toDept.name}
                </span>
                <span className="ml-auto text-xs text-slate-400">{deps.length} dependency{deps.length > 1 ? 'ies' : 'y'}</span>
              </div>

              <div className="divide-y divide-slate-50">
                {deps.map(({ task, depTask }) => (
                  <div key={`${task.id}-${depTask.id}`} className="px-5 py-3 grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                    {/* Blocking task (from dept) */}
                    <button
                      className="text-left hover:bg-slate-50 rounded-lg p-2 transition-colors"
                      onClick={() => setSelected(depTask)}
                    >
                      <div className="text-xs text-slate-400 mb-0.5 font-mono">{depTask.id}</div>
                      <div className="text-sm font-medium text-slate-700">{depTask.title}</div>
                      <Badge className={cn('mt-1', statusColor(depTask.status))}>
                        {statusLabel(depTask.status)}
                      </Badge>
                    </button>

                    {/* Arrow */}
                    <div className="flex flex-col items-center gap-1">
                      <ArrowRight className="w-5 h-5 text-slate-300" />
                      <span className="text-[10px] text-slate-300">blocks</span>
                    </div>

                    {/* Dependent task (to dept) */}
                    <button
                      className="text-left hover:bg-slate-50 rounded-lg p-2 transition-colors"
                      onClick={() => setSelected(task)}
                    >
                      <div className="text-xs text-slate-400 mb-0.5 font-mono">{task.id}</div>
                      <div className="text-sm font-medium text-slate-700">{task.title}</div>
                      <Badge className={cn('mt-1', statusColor(task.status))}>
                        {statusLabel(task.status)}
                      </Badge>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
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
