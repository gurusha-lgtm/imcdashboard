'use client';
import { useState } from 'react';
import { Task, Status } from '@/lib/data';
import { cn } from '@/lib/utils';

interface StatusPillProps {
  task: Task;
  onUpdate: (status: Status, blockedReason?: string) => void;
  size?: 'sm' | 'md';
}

const STATUSES: { value: Status; label: string; active: string; inactive: string }[] = [
  {
    value: 'not_started',
    label: 'To do',
    active: 'bg-slate-600 text-white',
    inactive: 'border border-slate-300 text-slate-500 hover:bg-slate-50',
  },
  {
    value: 'in_progress',
    label: 'In Progress',
    active: 'bg-blue-600 text-white',
    inactive: 'border border-blue-300 text-blue-500 hover:bg-blue-50',
  },
  {
    value: 'done',
    label: 'Done',
    active: 'bg-green-600 text-white',
    inactive: 'border border-green-300 text-green-600 hover:bg-green-50',
  },
  {
    value: 'blocked',
    label: 'Blocked',
    active: 'bg-red-600 text-white',
    inactive: 'border border-red-300 text-red-500 hover:bg-red-50',
  },
];

export function StatusPill({ task, onUpdate, size = 'sm' }: StatusPillProps) {
  const [showBlockedInput, setShowBlockedInput] = useState(false);
  const [blockedReason, setBlockedReason] = useState('');

  function handleClick(e: React.MouseEvent, status: Status) {
    e.stopPropagation();
    if (status === 'blocked') {
      if (task.status === 'blocked') {
        // Toggle off → set back to in_progress
        onUpdate('in_progress');
      } else {
        setShowBlockedInput(true);
      }
      return;
    }
    setShowBlockedInput(false);
    onUpdate(status);
  }

  function handleBlockedSubmit(e: React.MouseEvent) {
    e.stopPropagation();
    if (!blockedReason.trim()) return;
    onUpdate('blocked', blockedReason.trim());
    setBlockedReason('');
    setShowBlockedInput(false);
  }

  const pillClass = cn(
    'rounded-full font-medium transition-colors whitespace-nowrap',
    size === 'md' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'
  );

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="flex flex-wrap gap-1.5">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={(e) => handleClick(e, s.value)}
            className={cn(pillClass, task.status === s.value ? s.active : s.inactive)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {showBlockedInput && (
        <div className="mt-2 flex gap-2" onClick={(e) => e.stopPropagation()}>
          <input
            autoFocus
            type="text"
            placeholder="What's stopping this?"
            value={blockedReason}
            onChange={(e) => setBlockedReason(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleBlockedSubmit(e as unknown as React.MouseEvent);
              if (e.key === 'Escape') { setShowBlockedInput(false); setBlockedReason(''); }
            }}
            className="flex-1 text-sm border border-red-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-300 bg-white"
          />
          <button
            onClick={handleBlockedSubmit}
            className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 font-medium"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
