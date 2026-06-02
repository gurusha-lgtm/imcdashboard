'use client';
import { useAuth } from '@/lib/auth';
import { UserSelectModal } from './UserSelectModal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <UserSelectModal />;
  return <>{children}</>;
}
