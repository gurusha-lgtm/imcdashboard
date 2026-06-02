'use client';
import Link from 'next/link';
import { DepartmentInfo, Department } from '@/lib/data';
import { useTaskStore } from '@/lib/store';
import { healthColor, cn } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { TrendingUp, Mic, Megaphone, Newspaper, Landmark, Settings, Rocket, DollarSign, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';

const ICONS: Record<string, React.ElementType> = {
  TrendingUp, Mic, Megaphone, Newspaper, Landmark, Settings, Rocket, DollarSign,
};

export function DeptCard({ dept }: { dept: DepartmentInfo }) {
  const { tasks } = useTaskStore();
  const deptTasks = tasks.filter((t) => t.department === dept.id);
  const total = deptTasks.length;
  const done = deptTasks.filter((t) => t.status === 'done').length;
  const blocked = deptTasks.filter((t) => t.status === 'blocked').length;
  const inProgress = deptTasks.filter((t) => t.status === 'in_progress').length;
  const overdue = deptTasks.filter((t) => t.status !== 'done' && new Date(t.dueDate) < new Date()).length;
  const progress = total ? Math.round((done / total) * 100) : 0;
  let health: 'on-track' | 'at-risk' | 'blocked';
  if (blocked > 0 || overdue > 1) health = 'blocked';
  else if (overdue > 0 || (total > 0 && done / total < 0.3 && inProgress < 2)) health = 'at-risk';
  else health = 'on-track';

  const Icon = ICONS[dept.icon] || Settings;

  return (
    <Link href={`/department/${dept.id}`}>
      <div className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-md hover:border-slate-200 transition-all duration-150 cursor-pointer group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: dept.color + '15' }}>
              <Icon className="w-4.5 h-4.5" style={{ color: dept.color }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{dept.name}</h3>
              <p className="text-xs text-slate-400">{dept.lead}</p>
            </div>
          </div>
          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', healthColor(health))}>
            {health === 'on-track' ? 'On Track' : health === 'at-risk' ? 'At Risk' : 'Blocked'}
          </span>
        </div>
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{done}/{total} tasks done</span><span>{progress}%</span>
          </div>
          <ProgressBar value={progress} color={health === 'blocked' ? 'bg-red-400' : health === 'at-risk' ? 'bg-amber-400' : 'bg-emerald-400'} />
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-blue-600"><Clock className="w-3 h-3" /> {inProgress} active</span>
          {blocked > 0 && <span className="flex items-center gap-1 text-red-500"><AlertCircle className="w-3 h-3" /> {blocked} blocked</span>}
          {overdue > 0 && <span className="flex items-center gap-1 text-orange-500"><AlertCircle className="w-3 h-3" /> {overdue} overdue</span>}
          {overdue === 0 && blocked === 0 && <span className="flex items-center gap-1 text-emerald-500"><CheckCircle2 className="w-3 h-3" /> No issues</span>}
        </div>
      </div>
    </Link>
  );
}
