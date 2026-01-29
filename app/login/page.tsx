'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'consumer' as 'organizer' | 'consumer',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Apenas visual - redireciona para feed
    router.push('/feed')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo e título */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            GovConnect
          </h1>
          <p className="text-gray-400 text-lg">
            {isLogin ? 'Bem-vindo de volta!' : 'Crie sua conta gratuitamente'}
          </p>
        </div>

        {/* Card do formulário */}
        <div className="bg-dark-bgSecondary/90 backdrop-blur-xl border border-dark-border rounded-3xl p-8 shadow-2xl">
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Tipo de Conta
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: 'organizer' }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.userType === 'organizer'
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-dark-border hover:border-purple-500/50'
                  }`}
                >
                  <div className="text-2xl mb-2">📢</div>
                  <p className="text-sm font-semibold text-white">Organizador</p>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: 'consumer' }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.userType === 'consumer'
                      ? 'border-orange-500 bg-orange-500/20'
                      : 'border-dark-border hover:border-orange-500/50'
                  }`}
                >
                  <div className="text-2xl mb-2">👤</div>
                  <p className="text-sm font-semibold text-white">Usuário</p>
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                  placeholder="Seu nome completo"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {isLogin && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-purple-500 bg-dark-bg border-dark-border rounded focus:ring-purple-500"
                  />
                  <span className="text-gray-400">Lembrar-me</span>
                </label>
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Esqueceu a senha?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all glow-purple transform hover:scale-[1.02] shadow-xl"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-dark-border">
            <p className="text-center text-sm text-gray-500 mb-3">Ou continue com</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="px-4 py-3 bg-dark-bg border border-dark-border rounded-xl hover:bg-dark-bgSecondary transition-colors text-white font-medium"
              >
                Google
              </button>
              <button
                type="button"
                className="px-4 py-3 bg-dark-bg border border-dark-border rounded-xl hover:bg-dark-bgSecondary transition-colors text-white font-medium"
              >
                LinkedIn
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/feed" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Voltar ao feed
          </Link>
        </div>
      </div>
    </div>
  )
}
