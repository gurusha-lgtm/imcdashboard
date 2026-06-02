import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type DbTask = {
  id: string;
  title: string;
  description: string;
  department: string;
  status: string;
  priority: string;
  assignees: string[];
  due_date: string;
  created_at: string;
  tags: string[];
  subtasks: { id: string; title: string; done: boolean }[];
  comments: { id: string; author: string; text: string; timestamp: string }[];
  dependencies: string[];
  milestone: boolean;
  notes: string | null;
};
