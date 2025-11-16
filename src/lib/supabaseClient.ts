import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be defined in .env file");
}

// Define types for your database
export interface Database {
  public: {
    Tables: {
      submissions: {
        Row: { // The data expected to be returned from a "select" statement
          id: string;
          created_at: string;
          name: string;
          title: string;
          content: string;
          is_approved: boolean;
        };
        Insert: { // The data expected to be passed to an "insert" statement
          name: string;
          title: string;
          content: string;
        };
        Update: { // The data expected to be passed to an "update" statement
          is_approved?: boolean;
        };
      };
    };
  };
}


export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
