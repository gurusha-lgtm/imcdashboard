'use client';
import { cn, initials } from '@/lib/utils';

const COLORS = [
  'bg-blue-500', 'bg-violet-500', 'bg-pink-500', 'bg-amber-500',
  'bg-emerald-500', 'bg-red-500', 'bg-cyan-500', 'bg-orange-500',
];

function colorForName(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % COLORS.length;
  return COLORS[h];
}

export function Avatar({ name, size = 'sm' }: { name: string; size?: 'xs' | 'sm' | 'md' }) {
  const sizeClasses = { xs: 'w-5 h-5 text-[10px]', sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm' };
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-full font-semibold text-white shrink-0',
        colorForName(name),
        sizeClasses[size]
      )}
      title={name}
    >
      {initials(name)}
    </span>
  );
}

export function AvatarGroup({ names, max = 3 }: { names: string[]; max?: number }) {
  const shown = names.slice(0, max);
  const rest = names.length - max;
  return (
    <div className="flex -space-x-1.5">
      {shown.map((n) => (
        <Avatar key={n} name={n} size="xs" />
      ))}
      {rest > 0 && (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-semibold">
          +{rest}
        </span>
      )}
    </div>
  );
}
