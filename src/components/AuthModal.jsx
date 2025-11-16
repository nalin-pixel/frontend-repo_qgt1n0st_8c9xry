import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { toast } from 'sonner'

export default function AuthModal({ open, onClose, onAuthed }){
  const [mode, setMode] = useState('login')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    sic: '',
    full_name: '',
    branch: '',
    year: '',
    email: '',
    password: ''
  })

  const update = (k,v)=> setForm(prev => ({...prev, [k]: v}))

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === 'register') {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              sic: (form.sic || '').toUpperCase(),
              full_name: form.full_name,
              branch: form.branch,
              year: form.year,
            }
          }
        })
        if (error) throw error
        toast.success('Registration successful. Please verify your email.')
        onAuthed?.(data.session)
        onClose()
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        })
        if (error) throw error
        toast.success('Welcome back!')
        onAuthed?.(data.session)
        onClose()
      }
    } catch (err) {
      toast.error(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y:0, opacity: 1 }} className="relative w-[min(480px,92vw)] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-fuchsia-900/60 to-indigo-900/60 backdrop-blur-2xl shadow-2xl">
        <div className="p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">{mode === 'register' ? 'Create Account' : 'Login'}</h3>
            <button onClick={onClose} className="text-white/70 hover:text-white">✕</button>
          </div>

          <div className="flex gap-2 mb-4">
            <button onClick={()=>setMode('login')} className={`px-3 py-1 rounded-lg text-sm ${mode==='login'?'bg-white/15':'bg-white/5'}`}>Login</button>
            <button onClick={()=>setMode('register')} className={`px-3 py-1 rounded-lg text-sm ${mode==='register'?'bg-white/15':'bg-white/5'}`}>Register</button>
          </div>

          <form onSubmit={handleAuth} className="space-y-3">
            {mode==='register' && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="SIC" value={form.sic} onChange={v=>update('sic', v.toUpperCase())} required placeholder="e.g., 22CS001" />
                <Field label="Full Name" value={form.full_name} onChange={v=>update('full_name', v)} required />
                <Field label="Branch" value={form.branch} onChange={v=>update('branch', v)} required />
                <Field label="Year" value={form.year} onChange={v=>update('year', v)} required />
              </div>
            )}
            <Field label="Email" type="email" value={form.email} onChange={v=>update('email', v)} required />
            <Field label="Password" type="password" value={form.password} onChange={v=>update('password', v)} required />
            <button disabled={loading} className="w-full mt-2 relative inline-flex items-center justify-center px-4 py-2 rounded-xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 text-white font-semibold">
              {loading ? 'Please wait...' : (mode==='register' ? 'Create Account' : 'Login')}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

function Field({ label, value, onChange, type='text', required, placeholder }){
  return (
    <label className="block text-sm">
      <span className="text-white/80">{label}</span>
      <input type={type} required={required} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder}
        className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/15 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-fuchsia-500" />
    </label>
  )
}
