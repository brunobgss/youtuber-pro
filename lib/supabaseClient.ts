import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  // Avoid throwing during build; runtime routes should validate
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars are not set. Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
}

// Cliente para front-end (anon key)
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Cliente para back-end (service role key - mais permissões)
export function getSupabaseServer() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceRoleKey) {
    return createClient(supabaseUrl || '', serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }
  // Fallback para anon key se service role não estiver disponível
  return supabase;
}


