import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const fallbackUrl = 'https://placeholder-project.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2MDA0MDAwMDAsImV4cCI6MTkwMDAwMDAwMH0.placeholder';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('placeholder-project') &&
  supabaseUrl.startsWith('https://')
);

export const supabase = createClient(supabaseUrl || fallbackUrl, supabaseAnonKey || fallbackKey);
