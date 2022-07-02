import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants';

export const supabase = createClient(
  Constants.manifest?.extra?.supabaseUrl, 
  Constants.manifest?.extra?.supabaseAnonKey, 
  {
    localStorage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  }
);
