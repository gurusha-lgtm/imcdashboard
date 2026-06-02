'use client';
import { ALL_MEMBERS, useAuth } from '@/lib/auth';
import { DEPARTMENTS } from '@/lib/data';

const DEPT_LABELS: Record<string, string> = {
  sales_marketing: 'Sales & Marketing',
  programs: 'Programs',
  marketing_design: 'Marketing & Design',
  govt_relations: 'Govt Relations',
  finance_ops: 'Finance & Ops',
};

const DEPT_COLORS: Record<string, string> = {};
DEPARTMENTS.forEach((d) => { DEPT_COLORS[d.id] = d.color; });

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
}

export function UserSelectModal() {
  const { setUser } = useAuth();

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-900 via-slate-900 to-violet-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur mb-4">
            <span className="text-white font-bold text-2xl">IMC</span>
          </div>
          <h1 className="text-2xl font-bold text-white">IMC 2026 Dashboard</h1>
          <p className="text-blue-300 text-sm mt-1">India Mobile Congress · Oct 7–10, Yashobhoomi</p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
          <h2 className="text-white text-lg font-semibold text-center mb-5">Who are you?</h2>
          <div className="space-y-2">
            {ALL_MEMBERS.map((member) => {
              const deptColor = member.department ? DEPT_COLORS[member.department] : '#6d28d9';
              const deptLabel = member.department ? DEPT_LABELS[member.department] : 'CEO';
              return (
                <button
                  key={member.name}
                  onClick={() => setUser(member)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/20 active:bg-white/30 transition-colors text-left group"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-sm"
                    style={{ backgroundColor: deptColor }}
                  >
                    {getInitials(member.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium text-sm">{member.name}</div>
                    <div className="text-blue-300 text-xs">{deptLabel}</div>
                  </div>
                  <div
                    className="text-xs px-2 py-0.5 rounded-full font-medium text-white/80"
                    style={{ backgroundColor: `${deptColor}44` }}
                  >
                    {member.role === 'ceo' ? 'CEO' : member.role === 'lead' ? 'Lead' : 'Member'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
