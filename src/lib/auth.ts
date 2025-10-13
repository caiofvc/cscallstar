// Sistema de autenticação simples com senha única
const AUTH_KEY = 'csc_auth_token'
const SESSION_TIMEOUT = 72 * 60 * 60 * 1000 // 72 horas (3 dias)

interface AuthSession {
  authenticated: boolean
  timestamp: number
}

export const authService = {
  // Verificar se está autenticado
  isAuthenticated(): boolean {
    const session = this.getSession()
    if (!session || !session.authenticated) {
      return false
    }

    // Verificar se a sessão expirou
    const now = Date.now()
    if (now - session.timestamp > SESSION_TIMEOUT) {
      this.logout()
      return false
    }

    return true
  },

  // Fazer login com senha
  async login(password: string): Promise<boolean> {
    // A senha correta deve estar nas variáveis de ambiente
    const correctPassword = import.meta.env.VITE_APP_PASSWORD || 'cscallstar2025'
    
    if (password === correctPassword) {
      const session: AuthSession = {
        authenticated: true,
        timestamp: Date.now()
      }
      localStorage.setItem(AUTH_KEY, JSON.stringify(session))
      return true
    }

    throw new Error('Senha incorreta')
  },

  // Fazer logout
  logout(): void {
    localStorage.removeItem(AUTH_KEY)
  },

  // Obter sessão atual
  getSession(): AuthSession | null {
    try {
      const data = localStorage.getItem(AUTH_KEY)
      if (!data) return null
      return JSON.parse(data)
    } catch {
      return null
    }
  }
}
