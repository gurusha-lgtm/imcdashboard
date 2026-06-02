'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DEPARTMENTS } from './data';

export interface AuthUser {
  name: string;
  role: 'ceo' | 'lead' | 'member';
  department: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  setUser: (u: AuthUser) => void;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Build team member list from DEPARTMENTS
export const ALL_MEMBERS: AuthUser[] = [
  { name: 'P. Ramakrishna', role: 'ceo' as const, department: null },
  ...DEPARTMENTS.flatMap((dept) => [
    { name: dept.lead, role: 'lead' as const, department: dept.id },
    ...dept.members
      .filter((m) => m !== dept.lead)
      .map((m) => ({ name: m, role: 'member' as const, department: dept.id })),
  ]),
].filter((m, i, arr) => arr.findIndex((x) => x.name === m.name) === i);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('imc_user');
    if (stored) {
      try {
        setUserState(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
    setHydrated(true);
  }, []);

  function setUser(u: AuthUser) {
    localStorage.setItem('imc_user', JSON.stringify(u));
    setUserState(u);
  }

  function clearUser() {
    localStorage.removeItem('imc_user');
    setUserState(null);
  }

  if (!hydrated) return null;

  return (
    <AuthContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
