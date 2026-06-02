'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import type { Task, Department } from './data';

// Convert snake_case DB row → camelCase Task
function dbToTask(row: Record<string, unknown>): Task {
  return {
    id: row.id as string,
    title: row.title as string,
    description: (row.description as string) || '',
    department: row.department as Department,
    status: row.status as Task['status'],
    priority: row.priority as Task['priority'],
    assignees: (row.assignees as string[]) || [],
    dueDate: row.due_date as string,
    createdAt: row.created_at as string,
    tags: (row.tags as string[]) || [],
    subtasks: (row.subtasks as Task['subtasks']) || [],
    comments: (row.comments as Task['comments']) || [],
    dependencies: (row.dependencies as string[]) || [],
    milestone: (row.milestone as boolean) || false,
    notes: (row.notes as string) || undefined,
    blocked_reason: (row.blocked_reason as string) || undefined,
  };
}

interface UpdateOptions {
  blockedReason?: string;
  userName?: string;
}

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  updateTask: (id: string, changes: Partial<Task>, options?: UpdateOptions) => Promise<void>;
  addComment: (id: string, author: string, text: string) => Promise<void>;
  toggleSubtask: (taskId: string, subtaskId: string) => Promise<void>;
  refetch: () => Promise<void>;
}

const StoreContext = createContext<TaskStore | null>(null);

export function TaskStoreProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data.map(dbToTask));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  const patchTask = useCallback(async (id: string, payload: Record<string, unknown>) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to update task');
    const updated = await res.json();
    setTasks((prev) => prev.map((t) => (t.id === id ? dbToTask(updated) : t)));
  }, []);

  const updateTask = useCallback(async (id: string, changes: Partial<Task>, options?: UpdateOptions) => {
    const task = tasks.find((t) => t.id === id);
    // Map camelCase → snake_case for DB
    const payload: Record<string, unknown> = {};
    if (changes.status !== undefined) payload.status = changes.status;
    if (changes.priority !== undefined) payload.priority = changes.priority;
    if (changes.title !== undefined) payload.title = changes.title;
    if (changes.description !== undefined) payload.description = changes.description;
    if (changes.notes !== undefined) payload.notes = changes.notes;
    if (changes.assignees !== undefined) payload.assignees = changes.assignees;
    if (changes.dueDate !== undefined) payload.due_date = changes.dueDate;
    if (changes.subtasks !== undefined) payload.subtasks = changes.subtasks;
    if (changes.comments !== undefined) payload.comments = changes.comments;
    if (changes.blocked_reason !== undefined) payload.blocked_reason = changes.blocked_reason;

    // If setting to blocked with a reason, auto-add comment
    if (changes.status === 'blocked' && options?.blockedReason && task) {
      payload.blocked_reason = options.blockedReason;
      const autoComment = {
        id: `br_${Date.now()}`,
        author: options.userName || 'System',
        text: `🚨 Blocked: ${options.blockedReason}`,
        timestamp: new Date().toISOString().split('T')[0],
      };
      payload.comments = [...(task.comments || []), autoComment];
    }

    await patchTask(id, payload);
  }, [tasks, patchTask]);

  const addComment = useCallback(async (id: string, author: string, text: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const newComment = {
      id: `c${Date.now()}`,
      author,
      text,
      timestamp: new Date().toISOString().split('T')[0],
    };
    const updated = [...task.comments, newComment];
    await patchTask(id, { comments: updated });
  }, [tasks, patchTask]);

  const toggleSubtask = useCallback(async (taskId: string, subtaskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    const updated = task.subtasks.map((s) =>
      s.id === subtaskId ? { ...s, done: !s.done } : s
    );
    await patchTask(taskId, { subtasks: updated });
  }, [tasks, patchTask]);

  return React.createElement(
    StoreContext.Provider,
    { value: { tasks, loading, error, updateTask, addComment, toggleSubtask, refetch } },
    children
  );
}

export function useTaskStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useTaskStore must be used within TaskStoreProvider');
  return ctx;
}

// Selector helpers (same API as lib/data.ts)
export function useDepartmentTasks(dept: Department) {
  const { tasks } = useTaskStore();
  return tasks.filter((t) => t.department === dept);
}
