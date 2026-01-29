'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

type UserType = 'viewer' | 'publisher'

interface User {
  type: UserType
  name: string
  avatar: string
  role: string
}

export default function Navbar() {
  const pathname = usePathname()
  const [activeUser, setActiveUser] = useState<UserType>('viewer')
  const [showMenu, setShowMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const users: Record<UserType, User> = {
    viewer: {
      type: 'viewer',
      name: 'Visualizador',
      avatar: '👤',
      role: 'Explorar conteúdo'
    },
    publisher: {
      type: 'publisher',
      name: 'Publicador',
      avatar: '✍️',
      role: 'Criar e publicar'
    }
  }

  const handleUserSwitch = (userType: UserType) => {
    setActiveUser(userType)
  }

  const currentUser = users[activeUser]

  return (
    <nav className="bg-dark-bgSecondary border-b border-dark-border sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-2">
          {/* Menu Hamburger Mobile */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="sm:hidden text-gray-400 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showMobileMenu ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/feed" className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent hover:scale-105 transition-transform whitespace-nowrap">
            GovConnect
          </Link>
          
          {/* Menu Links - oculto em mobile muito pequeno */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-4 flex-1 justify-center">
            <Link
              href="/feed"
              className={`px-2 py-1.5 rounded-lg font-medium transition-all text-sm lg:text-base ${
                pathname === '/feed' 
                  ? 'text-purple-400 bg-purple-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
              }`}
            >
              Feed
            </Link>
            <Link
              href="/vagas"
              className={`px-2 py-1.5 rounded-lg font-medium transition-all text-sm lg:text-base ${
                pathname === '/vagas' 
                  ? 'text-purple-400 bg-purple-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
              }`}
            >
              💼 Vagas
            </Link>
            <Link
              href="/painel"
              className={`px-2 py-1.5 rounded-lg font-medium transition-all text-sm lg:text-base ${
                pathname === '/painel' 
                  ? 'text-purple-400 bg-purple-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
              }`}
            >
              📊 Painel
            </Link>
            
            {/* Menu de Funcionalidades */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`px-2 py-1.5 rounded-lg font-medium transition-all text-sm lg:text-base ${
                  pathname.startsWith('/noticias') || pathname.startsWith('/transparencia') || 
                  pathname.startsWith('/forum') || pathname.startsWith('/biblioteca') ||
                  pathname.startsWith('/mapa') || pathname.startsWith('/atendimento') ||
                  pathname.startsWith('/denuncias') || pathname.startsWith('/indicadores') ||
                  pathname.startsWith('/cursos') || pathname.startsWith('/calendario')
                    ? 'text-purple-400 bg-purple-500/10' 
                    : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
                }`}
              >
                ⚙️ Serviços
              </button>
              
              {showMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMenu(false)}
                  ></div>
                  <div className="absolute top-full left-0 mt-2 w-64 bg-dark-bgSecondary border border-dark-border rounded-xl shadow-2xl z-50 p-2">
                    <div className="grid grid-cols-1 gap-1">
                      <Link href="/noticias" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        📰 Notícias
                      </Link>
                      <Link href="/transparencia" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        🔍 Transparência
                      </Link>
                      <Link href="/forum" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        💬 Fórum
                      </Link>
                      <Link href="/biblioteca" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        📚 Biblioteca
                      </Link>
                      <Link href="/mapa" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        🗺️ Mapa de Órgãos
                      </Link>
                      <Link href="/atendimento" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        💬 Atendimento
                      </Link>
                      <Link href="/denuncias" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        🚨 Denúncias
                      </Link>
                      <Link href="/indicadores" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        📊 Indicadores
                      </Link>
                      <Link href="/cursos" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        🎓 Cursos
                      </Link>
                      <Link href="/calendario" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        📅 Calendário
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Seletor de Usuários */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-1 bg-dark-bg/60 rounded-lg p-1 border border-dark-border">
              {/* Usuário Visualizador */}
              <button
                onClick={() => handleUserSwitch('viewer')}
                className={`flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-1.5 rounded-md transition-all relative group ${
                  activeUser === 'viewer'
                    ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 border border-blue-400/50 shadow-lg'
                    : 'hover:bg-dark-bg/70'
                }`}
                title="Modo Visualizador - Explore conteúdo"
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-base sm:text-lg font-bold overflow-hidden border-2 ${
                  activeUser === 'viewer' ? 'border-blue-300/80 shadow-blue-500/50 shadow-lg' : 'border-blue-300/30'
                }`}>
                  <span>👤</span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className={`text-xs sm:text-sm font-semibold ${
                    activeUser === 'viewer' ? 'text-blue-300' : 'text-gray-300'
                  }`}>
                    Visualizar
                  </div>
                  <div className="text-[10px] text-gray-500 hidden lg:block">
                    Explorar
                  </div>
                </div>
                {activeUser === 'viewer' && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full"></div>
                )}
              </button>

              {/* Usuário Publicador */}
              <button
                onClick={() => handleUserSwitch('publisher')}
                className={`flex items-center space-x-1.5 sm:space-x-2 px-2 sm:px-3 py-1.5 rounded-md transition-all relative group ${
                  activeUser === 'publisher'
                    ? 'bg-gradient-to-r from-orange-500/30 to-yellow-500/30 border border-orange-400/50 shadow-lg'
                    : 'hover:bg-dark-bg/70'
                }`}
                title="Modo Publicador - Criar e publicar conteúdo"
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-white text-base sm:text-lg font-bold overflow-hidden border-2 ${
                  activeUser === 'publisher' ? 'border-orange-300/80 shadow-orange-500/50 shadow-lg' : 'border-orange-300/30'
                }`}>
                  <span>✍️</span>
                </div>
                <div className="hidden sm:block text-left">
                  <div className={`text-xs sm:text-sm font-semibold ${
                    activeUser === 'publisher' ? 'text-orange-300' : 'text-gray-300'
                  }`}>
                    Publicar
                  </div>
                  <div className="text-[10px] text-gray-500 hidden lg:block">
                    Criar conteúdo
                  </div>
                </div>
                {activeUser === 'publisher' && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"></div>
                )}
              </button>
            </div>

            {/* Botão de ação baseado no usuário */}
            {activeUser === 'publisher' && (
              <Link
                href="/vagas/nova"
                className="flex items-center justify-center w-8 h-8 sm:w-auto sm:px-3 sm:py-2 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white rounded-lg hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 transition-all font-bold text-xs sm:text-sm transform hover:scale-105 shadow-lg glow-orange"
                title="Criar nova vaga"
              >
                <span className="hidden sm:inline">+ Nova Vaga</span>
                <span className="sm:hidden">+</span>
              </Link>
            )}

            {/* Link de perfil */}
            <Link
              href="/perfil"
              className={`flex items-center justify-center w-8 h-8 sm:w-auto sm:px-3 sm:py-2 rounded-lg font-medium transition-all text-sm ${
                pathname === '/perfil' 
                  ? 'text-purple-400 bg-purple-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
              }`}
              title="Perfil"
            >
              <span className="text-lg sm:hidden">👤</span>
              <span className="hidden sm:inline">👤 Perfil</span>
            </Link>
          </div>
        </div>

        {/* Menu Mobile */}
        {showMobileMenu && (
          <div className="sm:hidden border-t border-dark-border pt-4 pb-4">
            <div className="space-y-2">
              <Link
                href="/feed"
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === '/feed' 
                    ? 'text-purple-400 bg-purple-500/10' 
                    : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
                }`}
              >
                Feed
              </Link>
              <Link
                href="/vagas"
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === '/vagas' 
                    ? 'text-purple-400 bg-purple-500/10' 
                    : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
                }`}
              >
                💼 Vagas
              </Link>
              <Link
                href="/painel"
                onClick={() => setShowMobileMenu(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                  pathname === '/painel' 
                    ? 'text-purple-400 bg-purple-500/10' 
                    : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
                }`}
              >
                📊 Painel
              </Link>
              <div className="border-t border-dark-border pt-2 mt-2">
                <div className="px-4 py-2 text-xs text-gray-500 font-semibold">SERVIÇOS</div>
                <Link href="/noticias" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-bg/50 transition-all">
                  📰 Notícias
                </Link>
                <Link href="/transparencia" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-bg/50 transition-all">
                  🔍 Transparência
                </Link>
                <Link href="/forum" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-bg/50 transition-all">
                  💬 Fórum
                </Link>
                <Link href="/biblioteca" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-bg/50 transition-all">
                  📚 Biblioteca
                </Link>
                <Link href="/mapa" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-bg/50 transition-all">
                  🗺️ Mapa
                </Link>
                <Link href="/atendimento" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-bg/50 transition-all">
                  💬 Atendimento
                </Link>
                <Link href="/denuncias" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-bg/50 transition-all">
                  🚨 Denúncias
                </Link>
                <Link href="/indicadores" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-bg/50 transition-all">
                  📊 Indicadores
                </Link>
                <Link href="/cursos" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-bg/50 transition-all">
                  🎓 Cursos
                </Link>
                <Link href="/calendario" onClick={() => setShowMobileMenu(false)} className="block px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-bg/50 transition-all">
                  📅 Calendário
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Indicador de usuário ativo - mobile only */}
        <div className="sm:hidden pb-2">
          <div className="text-xs text-center text-gray-500">
            Modo: <span className={`font-semibold ${
              activeUser === 'viewer' ? 'text-blue-400' : 'text-orange-400'
            }`}>
              {currentUser.name}
            </span>
          </div>
        </div>
      </div>
    </nav>
  )
}
