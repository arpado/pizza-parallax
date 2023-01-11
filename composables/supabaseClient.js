import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qykublxyqkhmvdpnkezp.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5a3VibHh5cWtobXZkcG5rZXpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA4NDE5OTQsImV4cCI6MTk4NjQxNzk5NH0.0gSOCBwn1dkwiX8f6twIes8gAN-Jr_aZYlBNjb1iDP4"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase