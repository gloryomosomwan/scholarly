import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ivldeddmxojuoeggvrui.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2bGRlZGRteG9qdW9lZ2d2cnVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0NzU0MzMsImV4cCI6MjA2ODA1MTQzM30.as106SHQB3jd-MwmleSUcnG8GSveHDEW_uuQsquputY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})