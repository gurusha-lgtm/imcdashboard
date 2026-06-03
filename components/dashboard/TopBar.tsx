'use client';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useAuth, ALL_MEMBERS } from '@/lib/auth';
import { DEPARTMENTS } from '@/lib/data';
import { ChevronDown, User } from 'lucide-react';
import { cn } from '@/lib/utils';

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

const DEPT_COLORS: Record<string, string> = {};
DEPARTMENTS.forEach((d) => { DEPT_COLORS[d.id] = d.color; });

const DEPT_NAMES: Record<string, string> = {};
DEPARTMENTS.forEach((d) => { DEPT_NAMES[d.id] = d.name; });

// Group members by department for the dropdown
const grouped = [
  { label: 'Leadership', members: ALL_MEMBERS.filter((m) => m.role === 'ceo') },
  ...DEPARTMENTS.map((d) => ({
    label: d.name,
    members: ALL_MEMBERS.filter((m) => m.department === d.id),
  })),
];

export function TopBar() {
  const { user, setUser } = useAuth();

  const color = user?.department ? (DEPT_COLORS[user.department] || '#6d28d9') : '#6d28d9';
  const deptLabel = user?.department ? (DEPT_NAMES[user.department] || '') : (user?.role === 'ceo' ? 'CEO' : '');

  return (
    <div className="h-12 bg-white border-b border-slate-100 flex items-center justify-between px-5 shrink-0">
      {/* Left: breadcrumb or title — intentionally minimal */}
      <div className="text-xs text-slate-400 font-medium">IMC 2026 · Project Dashboard</div>

      {/* Right: user switcher */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-colors focus:outline-none group">
            {user ? (
              <>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {getInitials(user.name)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-xs font-semibold text-slate-700 leading-tight">{user.name}</div>
                  {deptLabel && <div className="text-[10px] text-slate-400 leading-tight">{deptLabel}</div>}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <User className="w-4 h-4" />
                <span className="text-xs">Select user</span>
              </div>
            )}
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-data-[state=open]:rotate-180 transition-transform" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={6}
            className="z-50 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 overflow-y-auto max-h-[80vh]"
          >
            <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
              Viewing as
            </div>
            {grouped.map((group) => (
              group.members.length === 0 ? null : (
                <div key={group.label}>
                  <div className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-300">
                    {group.label}
                  </div>
                  {group.members.map((member) => {
                    const mColor = member.department ? (DEPT_COLORS[member.department] || '#6d28d9') : '#6d28d9';
                    const isActive = user?.name === member.name;
                    return (
                      <DropdownMenu.Item
                        key={member.name}
                        onSelect={() => setUser(member)}
                        className={cn(
                          'flex items-center gap-2.5 px-3 py-2 cursor-pointer outline-none transition-colors',
                          isActive
                            ? 'bg-blue-50'
                            : 'hover:bg-slate-50 focus:bg-slate-50'
                        )}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                          style={{ backgroundColor: mColor }}
                        >
                          {getInitials(member.name)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={cn('text-xs font-medium truncate', isActive ? 'text-blue-700' : 'text-slate-700')}>
                            {member.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate capitalize">
                            {member.role === 'ceo' ? 'CEO' : member.role}
                          </div>
                        </div>
                        {isActive && (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        )}
                      </DropdownMenu.Item>
                    );
                  })}
                </div>
              )
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
