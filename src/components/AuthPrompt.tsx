import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

interface AuthPromptProps {
  onClose: () => void
}

export default function AuthPrompt({ onClose }: AuthPromptProps) {
  const [showLogin, setShowLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      onClose()
      navigate('/feed')
    } catch (err) {
      setError('Email ou senha incorretos. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent mb-2">
            ConecteGov
          </h2>
          <p className="text-gray-400 text-sm">
            {showLogin ? 'Entre para continuar' : 'Crie sua conta para começar'}
          </p>
        </div>

        {/* Tabs Login/Cadastro */}
        <div className="flex gap-2 mb-6 bg-dark-bg rounded-lg p-1">
          <button
            onClick={() => {
              setShowLogin(true)
              setError('')
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              showLogin
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => {
              setShowLogin(false)
              setError('')
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              !showLogin
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Cadastrar
          </button>
        </div>

        {showLogin ? (
          /* Formulário de Login */
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="modal-email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="modal-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="modal-password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                id="modal-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-3 rounded-xl font-bold text-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        ) : (
          /* Link para página de cadastro completa */
          <div className="space-y-4">
            <p className="text-gray-400 text-sm text-center">
              Para criar sua conta, preencha o formulário completo de cadastro.
            </p>
            <Link
              to="/cadastro"
              onClick={onClose}
              className="block w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-3 rounded-xl font-bold text-lg text-center hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Ir para Cadastro
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
