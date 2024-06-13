const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "";
const supabaseAnonKey = "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
