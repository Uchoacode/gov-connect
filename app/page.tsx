'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent animate-fade-in">
            GovConnect
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            Hub de eventos e oportunidades do setor público
          </p>
          <p className="text-lg text-gray-400 mb-8">
            Conecte-se, aprenda e cresça no maior ecossistema público do Brasil
          </p>
          
          <div className="flex justify-center gap-4">
            <Link
              href="/login"
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all glow-purple transform hover:scale-105 shadow-xl"
            >
              Entrar
            </Link>
            <Link
              href="/feed"
              className="bg-dark-bgSecondary border-2 border-purple-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-500/10 transition-all transform hover:scale-105"
            >
              Explorar
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-dark-bgSecondary/50 backdrop-blur-sm border border-dark-border rounded-2xl p-6 hover:border-purple-500/50 transition-all card-hover">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-white mb-2">Eventos</h3>
            <p className="text-gray-400">Palestras, cursos e capacitações do setor público</p>
          </div>
          
          <div className="bg-dark-bgSecondary/50 backdrop-blur-sm border border-dark-border rounded-2xl p-6 hover:border-pink-500/50 transition-all card-hover">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-xl font-bold text-white mb-2">Vagas</h3>
            <p className="text-gray-400">Estágios e oportunidades de trabalho</p>
          </div>
          
          <div className="bg-dark-bgSecondary/50 backdrop-blur-sm border border-dark-border rounded-2xl p-6 hover:border-orange-500/50 transition-all card-hover">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-white mb-2">Networking</h3>
            <p className="text-gray-400">Conecte-se com profissionais do setor</p>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center">
          <div className="inline-flex gap-8 text-center">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">500+</div>
              <div className="text-sm text-gray-400">Eventos</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">200+</div>
              <div className="text-sm text-gray-400">Vagas</div>
            </div>
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">10k+</div>
              <div className="text-sm text-gray-400">Usuários</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
