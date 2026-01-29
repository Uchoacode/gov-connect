'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../providers/AuthProvider'
import Navbar from '@/components/Navbar'
import EventCard from '@/components/EventCard'
import PostCard from '@/components/PostCard'
import JobCardFeed from '@/components/JobCardFeed'

interface Event {
  id: string
  title: string
  description: string
  image?: string
  banner?: string
  location?: string
  date: string
  time?: string
  organizer: string
  organizerId: string
  category?: string
  area?: string
  modality: string
  isFree: boolean
  price?: string
  registrationLink?: string
  targetAudience?: string
  certification: boolean
  program?: string
  views: number
  createdAt: string
  user: {
    name: string
    avatar?: string
    userType: string
  }
}

interface Post {
  id: string
  content: string
  image?: string
  isInstitutional: boolean
  createdAt: string
  user: {
    name: string
    avatar?: string
    organization?: string
  }
}

export default function FeedPage() {
  const { user } = useAuth() // Login temporariamente desabilitado
  const [events, setEvents] = useState<Event[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeed()
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/vagas')
      if (response.ok) {
        const data = await response.json()
        setJobs(data.filter((job: any) => job.isActive).slice(0, 3))
      }
    } catch (error) {
      // Dados mockados de vagas
      setJobs([
        {
          id: 'job1',
          title: 'Estagiário de Tecnologia',
          description: 'Oportunidade para estudante de TI trabalhar com desenvolvimento de sistemas para o setor público.',
          company: 'Secretaria de Tecnologia',
          location: 'Brasília - DF',
          area: 'Tecnologia',
          type: 'estagio',
          salary: 'R$ 800 - R$ 1.200',
          isRemote: false,
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 'job2',
          title: 'Estagiário de Gestão Pública',
          description: 'Venha fazer parte da equipe de gestão pública! Trabalhe com projetos importantes.',
          company: 'Ministério da Administração',
          location: 'Remoto',
          area: 'Gestão Pública',
          type: 'estagio',
          salary: 'R$ 900 - R$ 1.300',
          isRemote: true,
          createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        },
      ])
    }
  }

  const fetchFeed = async () => {
    try {
      // Usar dados mockados para visualização
      const mockRes = await fetch('/api/eventos/mock')
      if (mockRes.ok) {
        const { events: mockEvents, posts: mockPosts } = await mockRes.json()
        setEvents(mockEvents)
        setPosts(mockPosts)
        setLoading(false)
        return
      }

      // Fallback para API real se mock não funcionar
      const [eventsRes, postsRes] = await Promise.all([
        fetch('/api/eventos'),
        fetch('/api/posts'),
      ])

      if (eventsRes.ok) {
        const eventsData = await eventsRes.json()
        setEvents(eventsData)
      }
      if (postsRes.ok) {
        const postsData = await postsRes.json()
        setPosts(postsData)
      }
    } catch (error) {
      console.error('Erro ao carregar feed:', error)
      // Em caso de erro, usar dados mockados locais
      const mockData = {
        events: [
          {
            id: '1',
            title: 'Seminário de Tecnologia no Setor Público',
            description: 'Um evento completo sobre as mais recentes inovações tecnológicas aplicadas ao setor público.',
            banner: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800',
            location: 'Auditório Central - Brasília',
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            time: '14:00',
            organizer: 'Instituto de Tecnologia Pública',
            organizerId: 'org1',
            area: 'Tecnologia',
            modality: 'presencial',
            isFree: true,
            certification: true,
            registrationLink: 'https://sympla.com.br/evento-exemplo',
            views: 234,
            createdAt: new Date().toISOString(),
            user: { name: 'Instituto de Tecnologia Pública', userType: 'organizer' },
          },
        ],
        posts: [],
      }
      setEvents(mockData.events)
      setPosts(mockData.posts)
    } finally {
      setLoading(false)
    }
  }

  // Combinar eventos, posts e vagas e ordenar por data
  const feedItems = [
    ...events.map(e => ({ type: 'event', data: e, createdAt: e.createdAt })),
    ...posts.map(p => ({ type: 'post', data: p, createdAt: p.createdAt })),
    ...jobs.map(j => ({ type: 'job', data: j, createdAt: j.createdAt })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="min-h-screen bg-dark-bg overflow-hidden relative">
      <Navbar />
      
      {/* Container principal com scroll snap usando dvh para mobile e calc para desktop */}
      <div className="h-[calc(100dvh-4rem)] sm:h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory scroll-smooth pb-0">
        
        {/* Progress bar no topo */}
        <div className="fixed top-16 left-0 right-0 h-1 bg-dark-bgSecondary/50 z-30 pointer-events-none">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-300"
            style={{ width: '33%' }}
          ></div>
        </div>

        {loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-border"></div>
              <p className="mt-4 text-gray-400">Carregando feed...</p>
            </div>
          </div>
        ) : feedItems.length === 0 ? (
          <div className="h-full w-full flex items-center justify-center p-4">
            <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-8 sm:p-12 text-center backdrop-blur-sm max-w-md w-full">
              <p className="text-gray-400 text-lg mb-6">
                Nenhum conteúdo encontrado
              </p>
              <a
                href="/eventos/novo"
                className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all font-bold w-full sm:w-auto"
              >
                Criar Primeiro Evento
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Overlay de controles fixos - Vagas de Emprego */}
            <div className="fixed top-20 sm:top-24 left-0 right-0 z-40 px-3 sm:px-4 flex justify-center items-center pointer-events-none">
              <div className="pointer-events-auto">
                <Link
                  href="/vagas"
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 border border-purple-500/30 rounded-full sm:rounded-xl px-4 py-2 hover:from-purple-500/30 hover:via-pink-500/30 hover:to-orange-500/30 transition-all backdrop-blur-sm shadow-lg"
                >
                  <span className="text-xl">💼</span>
                  <div>
                    <h2 className="text-sm font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                      Vagas
                    </h2>
                  </div>
                </Link>
              </div>
            </div>

            {/* Indicador de item atual - Escondido no mobile para limpar a tela */}
            <div className="hidden lg:flex fixed right-8 top-1/2 transform -translate-y-1/2 z-30 pointer-events-none">
              <div className="bg-dark-bgSecondary/80 backdrop-blur-md border border-purple-500/30 rounded-full p-3 glass">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{feedItems.length}</div>
                  <div className="text-xs text-gray-400">itens</div>
                </div>
              </div>
            </div>

            {/* Feed em formato Reels */}
            <div className="space-y-0">
              {feedItems.map((item, index) => (
                <div 
                  key={item.data.id} 
                  className="h-[calc(100dvh-4rem)] sm:h-[calc(100vh-4rem)] snap-start snap-always w-full flex items-center justify-center p-2 sm:px-4 py-16 sm:py-20 overflow-hidden"
                >
                  <div className="w-full h-full max-w-4xl flex flex-col justify-center">
                    {item.type === 'event' ? (
                      <EventCard event={item.data as Event} currentUserId={user?.id} isReelMode={true} />
                    ) : item.type === 'post' ? (
                      <PostCard post={item.data as Post} isReelMode={true} />
                    ) : (
                      <JobCardFeed job={item.data} />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Indicador de scroll para baixo - Apenas se houver itens */}
            <div className="fixed bottom-6 left-0 right-0 flex justify-center z-30 pointer-events-none animate-bounce opacity-70">
              <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 border border-white/10">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
