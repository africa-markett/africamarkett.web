import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Export a browser-safe client. Keep service key server-only. */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
