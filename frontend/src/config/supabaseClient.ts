// supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kcqcljzazatopmoifqzt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjcWNsanphemF0b3Btb2lmcXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU3NTk1NTMsImV4cCI6MjA3MTMzNTU1M30.8_Tdbh3Mfl8j3E2slOJ9gqrvlduGC4X0j8S-EDucIJk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
