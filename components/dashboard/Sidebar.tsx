'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DEPARTMENTS } from '@/lib/data';
import { getDepartmentStats } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, CalendarRange, AlertCircle,
  TrendingUp, Mic, Megaphone, Newspaper, Landmark, Settings, Rocket,
  FileSpreadsheet,
} from 'lucide-react';

const ICONS: Record<string, React.ElementType> = {
  TrendingUp, Mic, Megaphone, Newspaper, Landmark, Settings, Rocket,
};

const NAV = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/timeline', label: 'Master Timeline', icon: CalendarRange },
  { href: '/dependencies', label: 'Dependencies', icon: AlertCircle },
  { href: '/sheets-import', label: 'Sheets Import', icon: FileSpreadsheet },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">IMC</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">IMC 2026</div>
            <div className="text-[10px] text-slate-400">Project Dashboard</div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="px-3 py-3">
        <div className="space-y-0.5">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                pathname === href
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Departments */}
      <div className="px-3 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 px-3 mb-2">
          Departments
        </div>
        <div className="space-y-0.5">
          {DEPARTMENTS.map((dept) => {
            const Icon = ICONS[dept.icon] || Settings;
            const stats = getDepartmentStats(dept.id);
            const active = pathname === `/department/${dept.id}`;
            return (
              <Link
                key={dept.id}
                href={`/department/${dept.id}`}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors group',
                  active ? 'bg-slate-50 font-medium' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                )}
                style={active ? { color: dept.color } : {}}
              >
                <Icon className="w-4 h-4 shrink-0" style={{ color: dept.color }} />
                <span className="flex-1 truncate text-xs">{dept.name}</span>
                {stats.blocked > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" title="Has blocked tasks" />
                )}
                {stats.overdue > 0 && stats.blocked === 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" title="Has overdue tasks" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Event countdown */}
      <div className="px-4 py-3 m-3 bg-blue-50 rounded-xl">
        <div className="text-[10px] text-blue-500 font-semibold uppercase tracking-wide mb-0.5">Event Day</div>
        <div className="text-xs text-blue-800 font-medium">15 October 2026</div>
        <EventCountdown />
      </div>
    </aside>
  );
}

function EventCountdown() {
  const event = new Date('2026-10-15');
  const now = new Date();
  const days = Math.max(0, Math.round((event.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  return (
    <div className="text-2xl font-bold text-blue-700 mt-0.5">
      {days} <span className="text-sm font-normal text-blue-500">days away</span>
    </div>
  );
}
