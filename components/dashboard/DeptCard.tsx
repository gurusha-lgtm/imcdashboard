'use client';
import Link from 'next/link';
import { DepartmentInfo } from '@/lib/data';
import { getDepartmentStats } from '@/lib/data';
import { healthColor, cn } from '@/lib/utils';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  TrendingUp, Mic, Megaphone, Newspaper, Landmark, Settings, Rocket,
  AlertCircle, Clock, CheckCircle2
} from 'lucide-react';

const ICONS: Record<string, React.ElementType> = {
  TrendingUp, Mic, Megaphone, Newspaper, Landmark, Settings, Rocket,
};

interface Props {
  dept: DepartmentInfo;
}

export function DeptCard({ dept }: Props) {
  const stats = getDepartmentStats(dept.id);
  const Icon = ICONS[dept.icon] || Settings;

  return (
    <Link href={`/department/${dept.id}`}>
      <div className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-md hover:border-slate-200 transition-all duration-150 cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: dept.color + '15' }}
            >
              <Icon className="w-4.5 h-4.5" style={{ color: dept.color }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">{dept.name}</h3>
              <p className="text-xs text-slate-400">{dept.lead}</p>
            </div>
          </div>
          <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', healthColor(stats.health))}>
            {stats.health === 'on-track' ? 'On Track' : stats.health === 'at-risk' ? 'At Risk' : 'Blocked'}
          </span>
        </div>

        {/* Progress */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-slate-400 mb-1">
            <span>{stats.done}/{stats.total} tasks done</span>
            <span>{stats.progress}%</span>
          </div>
          <ProgressBar
            value={stats.progress}
            color={stats.health === 'blocked' ? 'bg-red-400' : stats.health === 'at-risk' ? 'bg-amber-400' : 'bg-emerald-400'}
          />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-blue-600">
            <Clock className="w-3 h-3" /> {stats.inProgress} active
          </span>
          {stats.blocked > 0 && (
            <span className="flex items-center gap-1 text-red-500">
              <AlertCircle className="w-3 h-3" /> {stats.blocked} blocked
            </span>
          )}
          {stats.overdue > 0 && (
            <span className="flex items-center gap-1 text-orange-500">
              <AlertCircle className="w-3 h-3" /> {stats.overdue} overdue
            </span>
          )}
          {stats.overdue === 0 && stats.blocked === 0 && (
            <span className="flex items-center gap-1 text-emerald-500">
              <CheckCircle2 className="w-3 h-3" /> No issues
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
