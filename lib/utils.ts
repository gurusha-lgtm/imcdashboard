import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type Status, type Priority, type Department } from './data';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function statusLabel(s: Status): string {
  const map: Record<Status, string> = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    blocked: 'Blocked',
    review: 'In Review',
    done: 'Done',
  };
  return map[s];
}

export function priorityLabel(p: Priority): string {
  const map: Record<Priority, string> = {
    critical: 'Critical',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
  };
  return map[p];
}

export function statusColor(s: Status): string {
  const map: Record<Status, string> = {
    not_started: 'bg-slate-100 text-slate-600',
    in_progress: 'bg-blue-100 text-blue-700',
    blocked: 'bg-red-100 text-red-700',
    review: 'bg-amber-100 text-amber-700',
    done: 'bg-green-100 text-green-700',
  };
  return map[s];
}

export function priorityColor(p: Priority): string {
  const map: Record<Priority, string> = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-slate-100 text-slate-500',
  };
  return map[p];
}

export function healthColor(h: 'on-track' | 'at-risk' | 'blocked'): string {
  return h === 'on-track'
    ? 'text-emerald-600 bg-emerald-50'
    : h === 'at-risk'
    ? 'text-amber-600 bg-amber-50'
    : 'text-red-600 bg-red-50';
}

export function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function daysUntil(d: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(d);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export const DEPT_COLORS: Record<Department, string> = {
  sales: '#2563eb',
  conference: '#7c3aed',
  marketing: '#db2777',
  pr: '#0891b2',
  govt_liaison: '#059669',
  operations: '#dc2626',
  aspire: '#d97706',
};
