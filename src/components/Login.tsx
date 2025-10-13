import { useState } from 'react'
import { LogIn, Loader2 } from 'lucide-react'

interface LoginProps {
  onLogin: (password: string) => Promise<void>
  loading: boolean
}

export default function Login({ onLogin, loading }: LoginProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!password.trim()) {
      setError('Digite a senha')
      return
    }

    try {
      await onLogin(password)
    } catch (err: any) {
      setError(err.message || 'Senha incorreta')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800/70 backdrop-blur rounded-2xl p-8 w-full max-w-md border border-slate-700 shadow-2xl">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏀</div>
          <h1 className="text-3xl font-bold text-white mb-2">CSC All Star</h1>
          <p className="text-slate-400">Sistema de Gerenciamento de Racha</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-slate-300 mb-2 font-medium">
              Senha de Acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Digite a senha"
              disabled={loading}
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Verificando...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Entrar
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Acesso restrito aos membros do CSC All Star
          </p>
        </div>
      </div>
    </div>
  )
}
