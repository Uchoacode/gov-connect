import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  UserIcon, BriefcaseIcon, ChartIcon, UsersIcon, NewsIcon, SearchIcon,
  ForumIcon, BookIcon, MapIcon, ChatIcon, AlertIcon, BarChartIcon,
  GraduationIcon, CalendarIcon, SettingsIcon, EditIcon, FeedIcon, MenuIcon, CloseIcon
} from './Icons'
import logoConecteGov from '../../logo-conecte-gov.png'

type UserType = 'viewer' | 'publisher'


export default function Navbar() {
  const location = useLocation()
  const pathname = location.pathname
  const [activeUser, setActiveUser] = useState<UserType>('viewer')
  const [showMenu, setShowMenu] = useState(false)
  const [showPublishMenu, setShowPublishMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleUserSwitch = (userType: UserType) => {
    setActiveUser(userType)
  }


  return (
    <nav className="bg-dark-bgSecondary border-b border-dark-border sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-2">
          {/* Logo */}
          <Link
            to="/feed"
            className="flex items-center gap-2 text-lg sm:text-xl lg:text-2xl font-bold hover:scale-105 transition-transform whitespace-nowrap"
          >
            <img
              src={logoConecteGov}
              alt="ConecteGov"
              className="h-7 w-auto sm:h-8 lg:h-9"
              loading="eager"
              decoding="async"
            />

          </Link>
          
          {/* Botão Menu Hambúrguer - apenas mobile */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-dark-bg/50 touch-manipulation"
            aria-label="Menu"
            aria-expanded={showMobileMenu}
          >
            {showMobileMenu ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
          
          {/* Menu Links - oculto em mobile muito pequeno */}
          <div className="hidden sm:flex items-center space-x-2 lg:space-x-4 flex-1 justify-center">
            <Link
              to="/feed"
              className={`px-2 py-1.5 rounded-lg font-medium transition-all text-sm lg:text-base ${
                pathname === '/feed' 
                  ? 'text-purple-400 bg-purple-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
              }`}
            >
              Feed
            </Link>
            <Link
              to="/vagas"
              className={`px-2 py-1.5 rounded-lg font-medium transition-all text-sm lg:text-base flex items-center gap-1.5 ${
                pathname === '/vagas' 
                  ? 'text-purple-400 bg-purple-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
              }`}
            >
              <BriefcaseIcon className="w-4 h-4" />
              <span>Vagas</span>
            </Link>
            <Link
              to="/painel"
              className={`px-2 py-1.5 rounded-lg font-medium transition-all text-sm lg:text-base flex items-center gap-1.5 ${
                pathname === '/painel' 
                  ? 'text-purple-400 bg-purple-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
              }`}
            >
              <ChartIcon className="w-4 h-4" />
              <span>Painel</span>
            </Link>
            <Link
              to="/govers"
              className={`px-2 py-1.5 rounded-lg font-medium transition-all text-sm lg:text-base flex items-center gap-1.5 ${
                pathname === '/govers' 
                  ? 'text-purple-400 bg-purple-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
              }`}
            >
              <UsersIcon className="w-4 h-4" />
              <span>Govers</span>
            </Link>
            
            {/* Menu de Funcionalidades */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowMenu(!showMenu)
                  setShowPublishMenu(false)
                }}
                className={`px-2 py-1.5 rounded-lg font-medium transition-all text-sm lg:text-base ${
                  pathname.startsWith('/noticias') || 
                  pathname.startsWith('/atendimento') ||
                  pathname.startsWith('/cursos') || pathname.startsWith('/calendario') ||
                  pathname.startsWith('/govers')
                    ? 'text-purple-400 bg-purple-500/10' 
                    : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
                }`}
              >
                <SettingsIcon className="w-4 h-4 inline mr-1" />
                Serviços
              </button>
              
              {showMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMenu(false)}
                  ></div>
                  <div className="absolute top-full left-0 mt-2 w-64 bg-dark-bgSecondary border border-dark-border rounded-xl shadow-2xl z-50 p-2">
                    <div className="grid grid-cols-1 gap-1">
                      <Link to="/noticias" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        <NewsIcon className="w-4 h-4 inline mr-2" />
                        Notícias
                      </Link>
                      <Link to="/cursos" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        <GraduationIcon className="w-4 h-4 inline mr-2" />
                        Cursos
                      </Link>
                      <Link to="/calendario" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        <CalendarIcon className="w-4 h-4 inline mr-2" />
                        Calendário
                      </Link>
                      <Link to="/atendimento" onClick={() => setShowMenu(false)} className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                        <ChatIcon className="w-4 h-4 inline mr-2" />
                        Atendimento
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
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white overflow-hidden border-2 ${
                  activeUser === 'viewer' ? 'border-blue-300/80 shadow-blue-500/50 shadow-lg' : 'border-blue-300/30'
                }`}>
                  <UserIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-white overflow-hidden border-2 ${
                  activeUser === 'publisher' ? 'border-orange-300/80 shadow-orange-500/50 shadow-lg' : 'border-orange-300/30'
                }`}>
                  <EditIcon className="w-4 h-4 sm:w-5 sm:h-5" />
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
              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowPublishMenu(!showPublishMenu)
                    setShowMenu(false)
                  }}
                  className="flex items-center justify-center w-8 h-8 sm:w-auto sm:px-3 sm:py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all font-bold text-xs sm:text-sm transform hover:scale-105 shadow-lg"
                  title="Publicar"
                  aria-haspopup="menu"
                  aria-expanded={showPublishMenu}
                >
                  <span className="hidden sm:inline">+ Publicar</span>
                  <span className="sm:hidden">+</span>
                </button>

                {showPublishMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowPublishMenu(false)}
                    ></div>
                    <div className="absolute right-0 top-full mt-2 w-60 bg-dark-bgSecondary border border-dark-border rounded-xl shadow-2xl z-50 p-2">
                      <div className="grid grid-cols-1 gap-1">
                        <button
                          type="button"
                          onClick={() => setShowPublishMenu(false)}
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm"
                        >
                          <EditIcon className="w-4 h-4 inline mr-2" />
                          Postagem
                        </button>
                        <Link
                          to="/vagas/nova"
                          onClick={() => setShowPublishMenu(false)}
                          className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm"
                        >
                          <BriefcaseIcon className="w-4 h-4 inline mr-2" />
                          Nova Vaga
                        </Link>
                        <Link
                          to="/eventos/novo"
                          onClick={() => setShowPublishMenu(false)}
                          className="px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm"
                        >
                          <CalendarIcon className="w-4 h-4 inline mr-2" />
                          Novo Evento
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Link de perfil */}
            <Link
              to="/perfil"
              className={`flex items-center justify-center w-8 h-8 sm:w-auto sm:px-3 sm:py-2 rounded-lg font-medium transition-all text-sm ${
                pathname === '/perfil' 
                  ? 'text-purple-400 bg-purple-500/10' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
              }`}
              title="Perfil"
            >
              <span className="sm:hidden">
                <UserIcon className="w-5 h-5" />
              </span>
              <span className="hidden sm:inline flex items-center gap-1.5">
                <UserIcon className="w-4 h-4" />
                Perfil
              </span>
            </Link>
          </div>
        </div>

        {/* Menu Mobile - aparece quando showMobileMenu é true */}
        {showMobileMenu && (
          <>
            {/* Overlay para fechar o menu ao clicar fora */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] sm:hidden"
              onClick={() => setShowMobileMenu(false)}
            />
            {/* Menu lateral */}
            <div className="fixed top-16 left-0 right-0 bg-dark-bgSecondary/95 backdrop-blur-xl border-b border-dark-border z-[70] sm:hidden max-h-[calc(100vh-4rem)] overflow-y-auto shadow-2xl animate-slide-down">
              <div className="px-4 py-4 space-y-1">
                <Link
                  to="/feed"
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    pathname === '/feed' 
                      ? 'text-purple-400 bg-purple-500/10' 
                      : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
                  }`}
                >
                  <FeedIcon className="w-5 h-5" />
                  <span>Feed</span>
                </Link>
                <Link
                  to="/vagas"
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    pathname === '/vagas' 
                      ? 'text-purple-400 bg-purple-500/10' 
                      : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
                  }`}
                >
                  <BriefcaseIcon className="w-5 h-5" />
                  <span>Vagas</span>
                </Link>
                <Link
                  to="/painel"
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    pathname === '/painel' 
                      ? 'text-purple-400 bg-purple-500/10' 
                      : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
                  }`}
                >
                  <ChartIcon className="w-5 h-5" />
                  <span>Painel</span>
                </Link>
                <Link
                  to="/govers"
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    pathname === '/govers' 
                      ? 'text-purple-400 bg-purple-500/10' 
                      : 'text-gray-400 hover:text-white hover:bg-dark-bg/50'
                  }`}
                >
                  <UsersIcon className="w-5 h-5" />
                  <span>Govers</span>
                </Link>
                
                {/* Divisor */}
                <div className="border-t border-dark-border my-2" />

                {/* Publicar (apenas publisher) */}
                {activeUser === 'publisher' && (
                  <div className="px-4 py-2">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Publicar
                    </div>
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => setShowMobileMenu(false)}
                        className="w-full flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm text-left"
                      >
                        <EditIcon className="w-5 h-5" />
                        <span>Postagem</span>
                      </button>
                      <Link
                        to="/vagas/nova"
                        onClick={() => setShowMobileMenu(false)}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm"
                      >
                        <BriefcaseIcon className="w-5 h-5" />
                        <span>Nova Vaga</span>
                      </Link>
                      <Link
                        to="/eventos/novo"
                        onClick={() => setShowMobileMenu(false)}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm"
                      >
                        <CalendarIcon className="w-5 h-5" />
                        <span>Novo Evento</span>
                      </Link>
                    </div>
                  </div>
                )}
                
                {/* Serviços */}
                <div className="px-4 py-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Serviços
                  </div>
                  <div className="space-y-1">
                    <Link to="/noticias" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                      <NewsIcon className="w-5 h-5" />
                      <span>Notícias</span>
                    </Link>
                    <Link to="/cursos" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                      <GraduationIcon className="w-5 h-5" />
                      <span>Cursos</span>
                    </Link>
                    <Link to="/calendario" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                      <CalendarIcon className="w-5 h-5" />
                      <span>Calendário</span>
                    </Link>
                    <Link to="/atendimento" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-dark-bg text-gray-300 hover:text-white transition-all text-sm">
                      <ChatIcon className="w-5 h-5" />
                      <span>Atendimento</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  )
}
