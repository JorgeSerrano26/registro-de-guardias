
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pdiizalnblkeorbghtlj.supabase.co'

const supabaseKey = process.env.SUPABASE_PROJECT_JWT || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;

