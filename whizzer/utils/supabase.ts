import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://abywcqquksfpaipjozbl.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFieXdjcXF1a3NmcGFpcGpvemJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY3NTM2MTIsImV4cCI6MTk3MjMyOTYxMn0.jvT4I8oW07U_geuoplLf1evIi45Xh5a8Jk-xCwirjXE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});
