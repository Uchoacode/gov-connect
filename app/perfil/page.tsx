'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState<'eventos' | 'vagas' | 'salvos'>('eventos')
  
  // Dados mockados do perfil
  const profile = {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    userType: 'organizer',
    organization: 'Secretaria de Tecnologia',
    avatar: null,
    bio: 'Servidor público há 10 anos, apaixonado por tecnologia e inovação no setor público.',
    area: 'Tecnologia',
    website: 'https://meusite.com.br',
    followers: 342,
    following: 128,
    events: 15,
  }

  const myEvents = [
    { id: '1', title: 'Seminário de Tecnologia', date: '15/03/2024', views: 1234 },
    { id: '2', title: 'Workshop de IA', date: '22/03/2024', views: 856 },
    { id: '3', title: 'Curso de Gestão', date: '30/03/2024', views: 567 },
  ]

  const myJobs = [
    { id: '1', title: 'Estagiário de TI', company: 'Secretaria de Tecnologia', applications: 24 },
    { id: '2', title: 'Desenvolvedor Júnior', company: 'Secretaria de Tecnologia', applications: 18 },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header do Perfil */}
        <div className="bg-gradient-to-r from-purple-900/50 via-pink-900/50 to-orange-900/50 rounded-3xl p-8 mb-8 border border-dark-border">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-dark-bgSecondary">
              {profile.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-white">{profile.name}</h1>
                {profile.userType === 'organizer' && (
                  <span className="bg-purple-500/30 text-purple-300 px-3 py-1 rounded-full text-sm font-bold border border-purple-500/50">
                    Organizador
                  </span>
                )}
              </div>
              <p className="text-xl text-gray-300 mb-2">{profile.organization}</p>
              <p className="text-gray-400 mb-4">{profile.bio}</p>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-gray-400">Seguidores:</span>
                  <span className="text-white font-bold ml-2">{profile.followers}</span>
                </div>
                <div>
                  <span className="text-gray-400">Seguindo:</span>
                  <span className="text-white font-bold ml-2">{profile.following}</span>
                </div>
                <div>
                  <span className="text-gray-400">Eventos:</span>
                  <span className="text-white font-bold ml-2">{profile.events}</span>
                </div>
              </div>
            </div>
            <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all">
              Editar Perfil
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-dark-border">
          <button
            onClick={() => setActiveTab('eventos')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'eventos'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Meus Eventos
          </button>
          {profile.userType === 'organizer' && (
            <button
              onClick={() => setActiveTab('vagas')}
              className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                activeTab === 'vagas'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Minhas Vagas
            </button>
          )}
          <button
            onClick={() => setActiveTab('salvos')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'salvos'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Salvos
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="space-y-4">
          {activeTab === 'eventos' && (
            <>
              {myEvents.map((event) => (
                <div key={event.id} className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-6 hover:border-purple-500/50 transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-gray-400">{event.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Visualizações</p>
                      <p className="text-purple-400 font-bold">{event.views}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'vagas' && (
            <>
              {myJobs.map((job) => (
                <div key={job.id} className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-6 hover:border-orange-500/50 transition-all">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                      <p className="text-gray-400">{job.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Candidaturas</p>
                      <p className="text-orange-400 font-bold">{job.applications}</p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          {activeTab === 'salvos' && (
            <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">⭐</div>
              <p className="text-gray-400 text-lg">Nenhum evento salvo ainda</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
