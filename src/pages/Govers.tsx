import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SocialFeed from '../components/SocialFeed'

interface User {
  id: string
  name: string
  avatar: string
  role: string
  organization: string
  location: string
  email?: string
  userRole?: string
  isOnline?: boolean
}

const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Maria Silva',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    role: 'Secretária de Gestão',
    organization: 'Secretaria de Administração',
    location: 'Brasília - DF',
    isOnline: true
  },
  {
    id: 'u2',
    name: 'João Santos',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    role: 'Diretor de Planejamento',
    organization: 'Ministério do Planejamento',
    location: 'Brasília - DF',
    isOnline: false
  },
  {
    id: 'u3',
    name: 'Ana Costa',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    role: 'Coordenadora de Projetos',
    organization: 'Agência de Inovação',
    location: 'São Paulo - SP',
    isOnline: true
  },
   {
    id: 'u4',
    name: 'Carlos Oliveira',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    role: 'Analista de Sistemas',
    organization: 'Secretaria de Tecnologia',
    location: 'Brasília - DF',
    isOnline: true
  },
  {
    id: 'u5',
    name: 'Fernanda Lima',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    role: 'Especialista em RH',
    organization: 'Escola de Governo',
    location: 'Rio de Janeiro - RJ',
    isOnline: false
  }
]

export default function Govers() {
  const [activeTab, setActiveTab] = useState<'feed' | 'discover'>('feed')

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-1">
             {/* Header Mobile Tabs */}
            <div className="lg:hidden flex gap-4 mb-6 border-b border-dark-border sticky top-16 bg-dark-bg/95 backdrop-blur-md z-30 pt-2 px-2">
               <button
                  onClick={() => setActiveTab('feed')}
                  className={`flex-1 pb-3 font-bold text-center border-b-2 transition-colors ${
                    activeTab === 'feed' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'
                  }`}
                >
                  Feed
                </button>
                <button
                  onClick={() => setActiveTab('discover')}
                  className={`flex-1 pb-3 font-bold text-center border-b-2 transition-colors ${
                    activeTab === 'discover' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400'
                  }`}
                >
                  Descobrir Govers
                </button>
            </div>

            {/* Content Switcher for Mobile / Always Feed for Desktop if we want split view */}
            {/* Actually, user wants "Instagram", so Main Feed + Sidebar is best. */}
            
            <div className={`${activeTab === 'feed' ? 'block' : 'hidden lg:block'}`}>
               <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Feed Govers</h1>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                     <div className="relative flex-1 sm:flex-none sm:w-64">
                        <input
                           type="text"
                           placeholder="Buscar servidores, órgãos..."
                           className="w-full bg-dark-bgSecondary border border-dark-border rounded-full px-4 py-2 pl-10 text-sm text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all"
                        />
                        <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                     </div>
                     <button className="relative p-2.5 bg-dark-bgSecondary border border-dark-border rounded-full text-gray-400 hover:text-white hover:border-purple-500/50 transition-all group">
                        <svg className="w-5 h-5 group-hover:animate-swing" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-dark-bg"></span>
                     </button>
                  </div>
               </div>
               
               {/* Stories / Destaques Bar - Centered */}
               <div className="relative max-w-2xl mx-auto mb-8">
                  <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scrollbar-hide justify-start sm:justify-center px-4">
                     {/* Add Story Button */}
                     <div className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[2px] border-2 border-dashed border-gray-600 group-hover:border-purple-500 transition-colors relative">
                           <div className="w-full h-full rounded-full bg-dark-bgSecondary flex items-center justify-center">
                              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                           </div>
                        </div>
                        <span className="text-xs text-gray-300">Meu Story</span>
                     </div>

                     {MOCK_USERS.map(u => (
                        <div key={u.id} className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group">
                           <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[3px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 group-hover:scale-105 transition-transform shadow-lg shadow-purple-900/20">
                              <div className="w-full h-full rounded-full bg-dark-bg p-[2px]">
                                 <img 
                                    src={u.avatar} 
                                    alt={u.name}
                                    className="w-full h-full rounded-full object-cover"
                                 />
                              </div>
                           </div>
                           <span className="text-xs text-gray-300 w-20 truncate text-center font-medium">{u.name.split(' ')[0]}</span>
                        </div>
                     ))}
                  </div>
               </div>

               <SocialFeed />
            </div>
            
            <div className={`${activeTab === 'discover' ? 'block' : 'hidden'} lg:hidden`}>
                <DiscoverList />
            </div>

          </div>

          {/* Sidebar (Desktop Only) */}
          <div className="hidden lg:block w-80 flex-shrink-0">
             <div className="sticky top-24 space-y-6">
                <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6">
                   <h2 className="text-xl font-bold text-white mb-4">Sugestões para você</h2>
                   <DiscoverList limit={5} />
                   <button className="w-full mt-4 text-purple-400 text-sm font-bold hover:text-purple-300">
                      Ver tudo
                   </button>
                </div>
                
                <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-xl p-6">
                   <h3 className="font-bold text-white mb-2">Seja um Gover Premium</h3>
                   <p className="text-sm text-gray-300 mb-4">Desbloqueie ferramentas exclusivas de análise e gestão.</p>
                   <button className="w-full bg-white text-purple-900 font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors">
                      Saiba mais
                   </button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                   © 2026 ConecteGov • Privacidade • Termos
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function DiscoverList({ limit }: { limit?: number }) {
   const list = limit ? MOCK_USERS.slice(0, limit) : MOCK_USERS
   return (
      <div className="space-y-4">
         {list.map(u => (
            <div key={u.id} className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-700">
                     <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <Link to={`/perfil/${u.id}`} className="font-bold text-white hover:underline text-sm block">
                        {u.name}
                     </Link>
                     <span className="text-xs text-gray-400 truncate block max-w-[120px]">{u.role}</span>
                  </div>
               </div>
               <button className="text-xs font-bold text-purple-400 hover:text-purple-300">
                  Seguir
               </button>
            </div>
         ))}
      </div>
   )
}
