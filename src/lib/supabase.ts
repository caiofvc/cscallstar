import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Exportar variáveis para verificação externa
export const hasSupabaseConfig = !!(supabaseUrl && supabaseAnonKey)

// Criar cliente com valores padrão vazios se não houver configuração
// Isso evita que a aplicação quebre completamente
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)
