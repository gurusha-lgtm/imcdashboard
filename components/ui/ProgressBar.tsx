'use client';
import { cn } from '@/lib/utils';

export function ProgressBar({
  value,
  className,
  color = 'bg-blue-500',
}: {
  value: number;
  className?: string;
  color?: string;
}) {
  return (
    <div className={cn('h-1.5 bg-slate-100 rounded-full overflow-hidden', className)}>
      <div
        className={cn('h-full rounded-full transition-all duration-500', color)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
