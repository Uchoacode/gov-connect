import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  userType: string
  avatar?: string
  bio?: string
  organization?: string
  website?: string
  area?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, userType: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carregar usuário do localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulação de login - em produção, fazer chamada à API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
      } else {
        throw new Error('Credenciais inválidas')
      }
    } catch (error) {
      // Fallback para desenvolvimento
      console.log('Login mockado para desenvolvimento')
      const mockUser: User = {
        id: '1',
        name: 'Usuário Teste',
        email,
        userType: 'consumer',
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    }
  }

  const register = async (name: string, email: string, password: string, userType: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, userType }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
      } else {
        throw new Error('Erro ao criar conta')
      }
    } catch (error) {
      // Fallback para desenvolvimento
      console.log('Registro mockado para desenvolvimento')
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        userType,
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
