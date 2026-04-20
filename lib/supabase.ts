import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database
export interface WeddingInvitation {
  id: string;
  theme: string;
  font: string;
  petals_enabled: boolean;
  created_at: string;
  updated_at: string;
}

export interface GuestBook {
  id: string;
  name: string;
  message: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export interface RSVPGuest {
  id: string;
  name: string;
  phone: string;
  attendance: 'attending' | 'not_attending' | 'pending';
  guests_count: number;
  dietary_restrictions?: string;
  created_at: string;
  updated_at: string;
}
