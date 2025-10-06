// supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

// 从环境变量读取Supabase配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kcqcljzazatopmoifqzt.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY || 'sb_publishable_VCpD0kHRMM18T7WMnrUmIA_hNoDZ229'

// 验证配置
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase配置错误: URL或Key未设置')
  throw new Error('Supabase配置不完整，请检查环境变量')
}

// 验证API-key格式
if (!supabaseAnonKey.startsWith('sb_') && !supabaseAnonKey.startsWith('eyJ')) {
  console.warn('⚠️ API-key格式可能不正确，请检查VITE_SUPABASE_PUBLIC_KEY')
}

// 调试信息
console.log('🔧 Supabase配置:')
console.log('  URL:', supabaseUrl)
console.log('  Key:', supabaseAnonKey ? '已设置' : '未设置')
console.log('  Key长度:', supabaseAnonKey?.length || 0)
console.log('  环境变量 VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('  环境变量 VITE_SUPABASE_PUBLIC_KEY:', import.meta.env.VITE_SUPABASE_PUBLIC_KEY)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
