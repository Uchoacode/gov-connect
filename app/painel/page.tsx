'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import EventCard from '@/components/EventCard'
import PostCard from '@/components/PostCard'
import JobCard from '@/components/JobCard'
import Link from 'next/link'

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

interface JobPosting {
  id: string
  title: string
  description: string
  company: string
  location?: string
  type: string
  area?: string
  requirements?: string
  benefits?: string
  salary?: string
  isRemote: boolean
  isActive: boolean
  applicationLink?: string
  createdAt: string
  user: {
    name: string
    avatar?: string
  }
}

type PanelSection = 'eventos' | 'posts' | 'vagas'

export default function PainelPage() {
  const [activeSection, setActiveSection] = useState<PanelSection>('eventos')
  const [events, setEvents] = useState<Event[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [jobs, setJobs] = useState<JobPosting[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([fetchEvents(), fetchPosts(), fetchJobs()])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchEvents = async () => {
    try {
      const mockRes = await fetch('/api/eventos/mock')
      if (mockRes.ok) {
        const { events: mockEvents } = await mockRes.json()
        setEvents(mockEvents || [])
      } else {
        const response = await fetch('/api/eventos')
        if (response.ok) {
          const data = await response.json()
          setEvents(data || [])
        } else {
          // Dados mockados locais
          setEvents([
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
          ])
        }
      }
    } catch (error) {
      console.error('Erro ao carregar eventos:', error)
      setEvents([])
    }
  }

  const fetchPosts = async () => {
    try {
      const mockRes = await fetch('/api/eventos/mock')
      if (mockRes.ok) {
        const { posts: mockPosts } = await mockRes.json()
        setPosts(mockPosts || [])
      } else {
        const response = await fetch('/api/posts')
        if (response.ok) {
          const data = await response.json()
          setPosts(data || [])
        } else {
          setPosts([])
        }
      }
    } catch (error) {
      console.error('Erro ao carregar posts:', error)
      setPosts([])
    }
  }

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/vagas')
      if (response.ok) {
        const data = await response.json()
        setJobs(data.filter((job: JobPosting) => job.isActive) || [])
      } else {
        // Dados mockados de vagas
        setJobs([
          {
            id: '1',
            title: 'Estagiário de Tecnologia',
            description: 'Oportunidade para estudante de TI trabalhar com desenvolvimento de sistemas para o setor público.',
            company: 'Secretaria de Tecnologia',
            location: 'Brasília - DF',
            type: 'estagio',
            area: 'Tecnologia',
            requirements: 'Cursando TI, conhecimento em programação, proatividade',
            benefits: 'Auxílio transporte, vale refeição, experiência prática',
            salary: 'R$ 800 - R$ 1.200',
            isRemote: false,
            isActive: true,
            createdAt: new Date().toISOString(),
            user: { name: 'Secretaria de Tecnologia' },
          },
          {
            id: '2',
            title: 'Estagiário de Gestão Pública',
            description: 'Venha fazer parte da equipe de gestão pública! Trabalhe com projetos importantes.',
            company: 'Ministério da Administração',
            location: 'Remoto',
            type: 'estagio',
            area: 'Gestão Pública',
            requirements: 'Cursando Administração, Direito ou áreas afins',
            benefits: 'Remoto, horário flexível, mentoria',
            salary: 'R$ 900 - R$ 1.300',
            isRemote: true,
            isActive: true,
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            user: { name: 'Ministério da Administração' },
          },
          {
            id: '3',
            title: 'Estagiário de Contabilidade',
            description: 'Estágio na área contábil do setor público. Aprenda sobre orçamento público e controle fiscal.',
            company: 'Tribunal de Contas',
            location: 'São Paulo - SP',
            type: 'estagio',
            area: 'Contabilidade',
            requirements: 'Cursando Ciências Contábeis do 5º semestre em diante',
            benefits: 'Vale refeição, auxílio transporte, experiência em órgão de controle',
            salary: 'R$ 950 - R$ 1.150',
            isRemote: false,
            isActive: true,
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            user: { name: 'Tribunal de Contas' },
          },
        ])
      }
    } catch (error) {
      console.error('Erro ao carregar vagas:', error)
      // Mesmos dados mockados em caso de erro
      setJobs([
        {
          id: '1',
          title: 'Estagiário de Tecnologia',
          description: 'Oportunidade para estudante de TI trabalhar com desenvolvimento de sistemas para o setor público.',
          company: 'Secretaria de Tecnologia',
          location: 'Brasília - DF',
          type: 'estagio',
          area: 'Tecnologia',
          requirements: 'Cursando TI, conhecimento em programação, proatividade',
          benefits: 'Auxílio transporte, vale refeição, experiência prática',
          salary: 'R$ 800 - R$ 1.200',
          isRemote: false,
          isActive: true,
          createdAt: new Date().toISOString(),
          user: { name: 'Secretaria de Tecnologia' },
        },
        {
          id: '2',
          title: 'Estagiário de Gestão Pública',
          description: 'Venha fazer parte da equipe de gestão pública! Trabalhe com projetos importantes.',
          company: 'Ministério da Administração',
          location: 'Remoto',
          type: 'estagio',
          area: 'Gestão Pública',
          requirements: 'Cursando Administração, Direito ou áreas afins',
          benefits: 'Remoto, horário flexível, mentoria',
          salary: 'R$ 900 - R$ 1.300',
          isRemote: true,
          isActive: true,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          user: { name: 'Ministério da Administração' },
        },
      ])
    }
  }

  const sections = [
    { id: 'eventos' as PanelSection, label: '📅 Eventos', count: events.length },
    { id: 'posts' as PanelSection, label: '📝 Posts', count: posts.length },
    { id: 'vagas' as PanelSection, label: '💼 Vagas', count: jobs.length },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header do Painel */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-1 sm:mb-2">
            Painel de Conteúdo
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
            Gerencie e visualize todos os conteúdos do portal
          </p>
        </div>

        {/* Navegação por Abas */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex space-x-2 sm:space-x-4 border-b border-dark-border overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-3 sm:px-4 lg:px-6 py-3 sm:py-4 font-semibold text-sm sm:text-base lg:text-lg transition-all relative whitespace-nowrap ${
                  activeSection === section.id
                    ? 'text-purple-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {section.label}
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm bg-dark-bgSecondary px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                  {section.count}
                </span>
                {activeSection === section.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo das Seções */}
        <div className="min-h-[60vh]">
          {loading ? (
            <div className="flex items-center justify-center py-12 sm:py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-border"></div>
                <p className="mt-4 text-gray-400 text-sm sm:text-base">Carregando conteúdo...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Seção de Eventos */}
              {activeSection === 'eventos' && (
                <div className="animate-fade-in">
                  <div className="mb-4 sm:mb-6 flex justify-between items-center flex-wrap gap-3 sm:gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Todos os Eventos</h2>
                    <Link
                      href="/eventos/novo"
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all font-bold text-sm sm:text-base transform hover:scale-105 shadow-lg"
                    >
                      + Criar Evento
                    </Link>
                  </div>
                  {events.length === 0 ? (
                    <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-8 sm:p-12 text-center">
                      <p className="text-gray-400 text-base sm:text-lg mb-4">
                        Ainda não há eventos cadastrados
                      </p>
                      <Link
                        href="/eventos/novo"
                        className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all font-bold text-sm sm:text-base"
                      >
                        Criar Primeiro Evento
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Seção de Posts */}
              {activeSection === 'posts' && (
                <div className="animate-fade-in">
                  <div className="mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Todos os Posts</h2>
                  </div>
                  {posts.length === 0 ? (
                    <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-8 sm:p-12 text-center">
                      <p className="text-gray-400 text-base sm:text-lg mb-4">
                        Ainda não há posts publicados
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Seção de Vagas */}
              {activeSection === 'vagas' && (
                <div className="animate-fade-in">
                  <div className="mb-4 sm:mb-6 flex justify-between items-center flex-wrap gap-3 sm:gap-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Todas as Vagas</h2>
                    <Link
                      href="/vagas/nova"
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all font-bold text-sm sm:text-base transform hover:scale-105 shadow-lg"
                    >
                      + Publicar Vaga
                    </Link>
                  </div>
                  {jobs.length === 0 ? (
                    <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-8 sm:p-12 text-center">
                      <p className="text-gray-400 text-base sm:text-lg mb-4">
                        Nenhuma vaga disponível no momento
                      </p>
                      <Link
                        href="/vagas/nova"
                        className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all font-bold text-sm sm:text-base"
                      >
                        Publicar Vaga
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {jobs.map((job) => (
                        <div key={job.id} className="h-full min-h-[350px] sm:min-h-[400px]">
                          <JobCard job={job} isCompact={true} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
