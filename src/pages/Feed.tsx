import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { FilterIcon, CloseIcon } from '../components/Icons'
import EventCardFeed, { type FeedEvent } from '../components/EventCardFeed'
import CourseCardFeed, { type FeedCourse } from '../components/CourseCardFeed'
import StoriesBar, { type Story } from '../components/StoriesBar'
import AuthPrompt from '../components/AuthPrompt'
import { useAuth } from '../providers/AuthProvider'
import { MOCK_POSTS, type Post } from '../components/SocialFeedData'
import PostCard from '../components/PostCard'
import CreatePostWidget from '../components/CreatePostWidget'

type FeedItemType = 'event' | 'course' | 'post'

interface FeedItem {
  type: FeedItemType
  event?: FeedEvent
  course?: FeedCourse
  post?: Post
}

// Mock Data (Preserved from original)
const MOCK_EVENTS: FeedEvent[] = [
  {
    id: 'ev1',
    title: 'Workshop de Gestão Pública',
    description: 'Workshop presencial sobre melhores práticas em gestão pública, planejamento estratégico e indicadores de desempenho. Voltado para servidores e gestores.',
    organizer: 'Escola Nacional de Administração',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    time: '14h',
    location: 'Brasília - DF',
    modality: 'presencial',
    category: 'Capacitação',
    isFree: true,
    registrationLink: 'https://example.com/inscricao',
    image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?q=80&w=1080',
  },
  {
    id: 'ev2',
    title: 'Palestra: Inovação no Setor Público',
    description: 'Palestra online sobre transformação digital, governo eletrônico e uso de dados abertos na administração pública.',
    organizer: 'Agência de Inovação',
    date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    time: '10h',
    location: 'Online',
    modality: 'online',
    category: 'Tecnologia',
    isFree: true,
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1080',
  },
  {
    id: 'ev3',
    title: 'Seminário de Transparência e Controle',
    description: 'Seminário híbrido sobre transparência pública, acesso à informação e controle social. Transmissão ao vivo disponível.',
    organizer: 'Ministério da Transparência',
    date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    time: '09h',
    location: 'São Paulo - SP / Online',
    modality: 'hibrido',
    category: 'Transparência',
    isFree: true,
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1080',
  },
  {
    id: 'ev4',
    title: 'Feira de Carreiras Públicas',
    description: 'Evento presencial com representantes de diversos órgãos públicos apresentando oportunidades de carreira, estágios e processos seletivos.',
    organizer: 'Secretaria de Gestão de Pessoas',
    date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    time: '09h - 17h',
    location: 'Rio de Janeiro - RJ',
    modality: 'presencial',
    category: 'Carreira',
    isFree: true,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1080',
  },
  {
    id: 'ev5',
    title: 'Webinar: Licitações e Contratos',
    description: 'Webinar gratuito sobre o novo marco legal de licitações, processos licitatórios e gestão de contratos públicos.',
    organizer: 'Escola de Governo',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    time: '19h',
    location: 'Online',
    modality: 'online',
    category: 'Capacitação',
    isFree: true,
    image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=1080',
  },
]

const MOCK_COURSES: FeedCourse[] = [
  {
    id: 'c1',
    title: 'Gestão Pública Moderna',
    description: 'Aprenda as melhores práticas de gestão pública, planejamento estratégico e políticas públicas eficientes. Curso 100% gratuito.',
    instructor: 'Prof. Maria Silva',
    duration: '40 horas',
    level: 'Intermediário',
    category: 'Gestão',
    enrolled: 1234,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1080',
  },
  {
    id: 'c2',
    title: 'Direito Administrativo',
    description: 'Curso completo sobre direito administrativo, licitações, contratos e processos administrativos. Com certificado.',
    instructor: 'Dr. João Santos',
    duration: '60 horas',
    level: 'Avançado',
    category: 'Direito',
    enrolled: 856,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1080',
  },
  {
    id: 'c3',
    title: 'Tecnologia no Setor Público',
    description: 'Transformação digital, governo eletrônico e inovação tecnológica na administração pública.',
    instructor: 'Eng. Carlos Oliveira',
    duration: '30 horas',
    level: 'Básico',
    category: 'Tecnologia',
    enrolled: 2100,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1080',
  },
  {
    id: 'c4',
    title: 'Preparação para Concursos Públicos',
    description: 'Curso completo de preparação para concursos públicos com foco em raciocínio lógico, português e conhecimentos gerais.',
    instructor: 'Prof. Ana Costa',
    duration: '80 horas',
    level: 'Todos os níveis',
    category: 'Preparação',
    enrolled: 3456,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1080',
  },
  {
    id: 'c5',
    title: 'Orçamento Público e Planejamento',
    description: 'Aprenda sobre elaboração de orçamentos públicos, planejamento financeiro e execução orçamentária.',
    instructor: 'Prof. Roberto Alves',
    duration: '35 horas',
    level: 'Intermediário',
    category: 'Finanças',
    enrolled: 987,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1080',
  },
]

const MOCK_STORIES: Story[] = [
  {
    id: 's1',
    userName: 'Maria Silva',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
    hasUnseen: true,
    stories: [
       { id: 'st1', type: 'image', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1080', duration: 5000 }
    ]
  },
  {
    id: 's2',
    userName: 'Carlos Oliveira',
    userAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop', // Fixed Avatar
    hasUnseen: true,
    stories: []
  },
  {
    id: 's3',
    userName: 'Lucas Martins',
    userAvatar: '',
    hasUnseen: false,
    stories: []
  },
  {
    id: 's4',
    userName: 'João Santos',
    userAvatar: '',
    hasUnseen: true,
    stories: []
  },
  {
    id: 's5',
    userName: 'Patricia Lima',
    userAvatar: '',
    hasUnseen: false,
    stories: []
  },
  {
    id: 's6',
    userName: 'Juliana Ferreira',
    userAvatar: '',
    hasUnseen: true,
    stories: [
       { id: 'st2', type: 'image', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1080', duration: 5000 }
    ]
  },
  {
    id: 's7',
    userName: 'Ana Costa',
    userAvatar: '',
    hasUnseen: false,
    stories: []
  },
]

/** Intercala eventos, cursos e posts no feed */
function buildFeedItems(extraPosts: Post[] = []): FeedItem[] {
  const events: FeedItem[] = MOCK_EVENTS.map((event) => ({ type: 'event', event }))
  const courses: FeedItem[] = MOCK_COURSES.map((course) => ({ type: 'course', course }))
  // Combine initial mock posts with any new posts created by user
  const allPosts = [...extraPosts, ...MOCK_POSTS]
  const posts: FeedItem[] = allPosts.map((post) => ({ type: 'post', post }))

  const all: FeedItem[] = []
  const maxLen = Math.max(events.length, courses.length, posts.length)

  // Intercalar eventos, posts e cursos de forma equilibrada
  for (let i = 0; i < maxLen; i++) {
    // A cada iteração tenta adicionar um Post, depois um Evento, depois um Curso
    // Isso garante que o feed não fique vazio de "conteúdo social"
    if (posts[i]) all.push(posts[i])
    if (events[i]) all.push(events[i])
    if (courses[i]) all.push(courses[i])
  }

  return all
}

const AREAS_FILTRO = [
  'Todas',
  'Capacitação',
  'Carreira',
  'Finanças'
]

export default function Feed() {
  const [items, setItems] = useState<FeedItem[]>([])
  const [filteredItems, setFilteredItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedArea, setSelectedArea] = useState<string>('Todas')
  const { user, loading: authLoading } = useAuth()
  const [showAuthPrompt, setShowAuthPrompt] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // User created posts in this session
  const [userCreatedPosts, setUserCreatedPosts] = useState<Post[]>([])
  
  // Post interaction states (lifted up for Feed)
  const [openComments, setOpenComments] = useState<string | null>(null)

  useEffect(() => {
    // Mostrar prompt de login se não estiver logado
    if (!authLoading && !user) {
      const hasSeenPrompt = sessionStorage.getItem('authPromptShown')
      if (!hasSeenPrompt) {
        setTimeout(() => {
          setShowAuthPrompt(true)
          sessionStorage.setItem('authPromptShown', 'true')
        }, 2000) // Mostra após 2 segundos
      }
    }
  }, [user, authLoading])

  useEffect(() => {
    const allItems = buildFeedItems(userCreatedPosts)
    setItems(allItems)
    // Re-apply filters when items change
    if (selectedArea === 'Todas') {
       setFilteredItems(allItems)
    } else {
       // Re-run filter logic
       const filtered = allItems.filter(item => {
        if (item.type === 'event' && item.event) return item.event.category === selectedArea
        if (item.type === 'course' && item.course) return item.course.category === selectedArea
        if (item.type === 'post') return true // Posts show in all filters for now, or we could filter by tag?
        return false
      })
      setFilteredItems(filtered)
    }
    setLoading(false)
  }, [userCreatedPosts]) // Re-run when new posts are created

  useEffect(() => {
    if (selectedArea === 'Todas') {
      setFilteredItems(items)
    } else {
      const filtered = items.filter(item => {
        if (item.type === 'event' && item.event) {
          return item.event.category === selectedArea
        }
        if (item.type === 'course' && item.course) {
          return item.course.category === selectedArea
        }
        if (item.type === 'post') {
           return true // Allow posts to be seen in all filters for social context
        }
        return false
      })
      setFilteredItems(filtered)
    }
  }, [selectedArea, items])

  const handleCreatePost = (newPost: Post) => {
     setUserCreatedPosts([newPost, ...userCreatedPosts])
  }

  // Handlers for Post Interactions
  const handleLike = (id: string, current: boolean) => {
    const updater = (list: FeedItem[]) => list.map(item => {
      if (item.type === 'post' && item.post && item.post.id === id) {
        return { 
          ...item, 
          post: { 
            ...item.post, 
            isLiked: !current, 
            likes: current ? item.post.likes - 1 : item.post.likes + 1 
          } 
        }
      }
      return item
    })
    
    setItems(prev => updater(prev))
    setFilteredItems(prev => updater(prev))
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      {showAuthPrompt && (
        <AuthPrompt onClose={() => setShowAuthPrompt(false)} />
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-0 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-8">
          
          {/* Left Sidebar - Filters (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0 h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide sticky top-24">
             <div className="space-y-6">
                <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-6">
                   <h3 className="text-lg font-bold text-white mb-4">Filtrar por</h3>
                   <div className="space-y-2">
                      <button
                        onClick={() => setSelectedArea('Todas')}
                        className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedArea === 'Todas'
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        🌟 Todas as áreas
                      </button>
                      {AREAS_FILTRO.filter(a => a !== 'Todas').map((area) => (
                        <button
                          key={area}
                          onClick={() => setSelectedArea(area)}
                          className={`w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            selectedArea === area
                              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Mini Profile / Stats Placeholder */}
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 rounded-2xl p-6 text-center">
                   <p className="text-gray-300 text-sm mb-3">Complete seu perfil para ver vagas compatíveis.</p>
                   <Link to="/perfil" className="text-purple-400 font-bold text-sm hover:underline">Ir para meu perfil &rarr;</Link>
                </div>
             </div>
          </div>

          {/* Main Feed Column */}
          <div className="flex-1 min-w-0 h-[100dvh] lg:min-h-[calc(100vh-120px)] lg:h-auto relative flex flex-col group/feed-container">
             
             {/* Mobile Filters - Floating Action Button */}
             <div className="lg:hidden absolute top-4 right-4 z-50 flex flex-col items-end pointer-events-none">
                <div className="pointer-events-auto flex flex-col items-end gap-2">
                   <button 
                      onClick={() => setShowMobileFilters(!showMobileFilters)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all border border-white/10 backdrop-blur-md ${
                        selectedArea !== 'Todas'
                           ? 'bg-purple-600 text-white'
                           : 'bg-black/60 text-gray-300 hover:text-white'
                      }`}
                   >
                      {showMobileFilters ? <CloseIcon className="w-5 h-5" /> : <FilterIcon className="w-5 h-5" />}
                   </button>
                   
                   {showMobileFilters && (
                      <div className="bg-dark-bgSecondary/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col gap-1 min-w-[140px] animate-fade-in shadow-2xl origin-top-right">
                          <div className="flex justify-between items-center px-2 py-1 mb-1 border-b border-white/5 pb-1">
                             <span className="text-[10px] font-bold text-gray-400 uppercase">Filtrar por</span>
                             {selectedArea !== 'Todas' && (
                                <button onClick={() => { setSelectedArea('Todas'); setShowMobileFilters(false); }} className="text-[10px] text-purple-400 hover:underline">
                                   Limpar
                                </button>
                             )}
                          </div>
                          <button
                             onClick={() => { setSelectedArea('Todas'); setShowMobileFilters(false); }}
                             className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                                selectedArea === 'Todas'
                                ? 'bg-white/10 text-white'
                                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                             }`}
                          >
                             Todas
                          </button>
                          {AREAS_FILTRO.filter(a => a !== 'Todas').map((area) => (
                            <button
                               key={area}
                               onClick={() => {
                                   setSelectedArea(area)
                                   setShowMobileFilters(false)
                               }}
                               className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                                  selectedArea === area
                                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
                               }`}
                            >
                               {area}
                            </button>
                          ))}
                      </div>
                   )}
                </div>
             </div>
             
             {/* Scrollable Feed Area - Full Screen Fixed on Mobile */}
             <div className="fixed inset-0 lg:static w-full h-full lg:h-auto overflow-y-scroll scrollbar-hide pb-0 lg:pb-safe snap-y snap-proximity z-0">
               {/* Stories - First Snap Item */}
               <div className="lg:hidden snap-start h-auto min-h-[140px] w-full bg-dark-bg border-b border-white/5 pb-4 pt-20 relative z-20 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent pointer-events-none" />
                  <StoriesBar stories={MOCK_STORIES} />
               </div>


               {/* Desktop Stories (Sticky/Standard) */}
               <div className="hidden lg:block bg-dark-bg border-b border-white/5 pb-2 pt-4 mb-4 relative z-20 w-full min-h-[140px]">
                  <h3 className="text-white font-bold text-lg mb-2 px-4 flex items-center gap-2">
                     Stories <span className="text-xs font-normal text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full border border-purple-400/20">Novo</span>
                  </h3>
                  <div className="w-full">
                     <StoriesBar stories={MOCK_STORIES} />
                  </div>
               </div>

               {/* Create Post Widget (Desktop Only usually, but let's allow on mobile header or stick manually? For now just desktop or top of feed flow) */}
               <div className="hidden lg:block mb-6">
                 <CreatePostWidget onPostCreated={handleCreatePost} />
               </div>

               {/* Content Feed */}
               <div className="divide-y divide-white/5 lg:divide-y bg-dark-bg w-full">
                 {loading ? (
                   <div className="py-20 text-center snap-center-always flex items-center justify-center min-h-[50vh]">
                     <div className="flex flex-col items-center">
                       <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500 mb-4" />
                       <p className="text-gray-500">Atualizando feed...</p>
                     </div>
                   </div>
                 ) : items.length === 0 ? (
                   <div className="snap-center-always flex items-center justify-center p-4 min-h-[50vh]">
                     <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-12 text-center w-full max-w-lg">
                       <p className="text-gray-400">Nenhum conteúdo disponível no momento.</p>
                     </div>
                   </div>
                 ) : filteredItems.length === 0 ? (
                   <div className="snap-center-always flex items-center justify-center p-4 min-h-[50vh]">
                     <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-12 text-center w-full max-w-lg">
                       <p className="text-gray-400 mb-4">Nenhum conteúdo encontrado para "{selectedArea}".</p>
                       <button onClick={() => setSelectedArea('Todas')} className="text-purple-400 font-bold hover:underline">Limpar filtros</button>
                     </div>
                   </div>
                 ) : (
                   filteredItems.map((item, index) => {
                     // Key logic for Reels feel: h-[100dvh] on mobile, auto on desktop
                     // For PostCard, we might want height auto on mobile to read long text?
                     // Or force full screen too. Let's force full screen for consistency with "Reels" feel requested.
                     const itemClass = "snap-start w-full h-[100dvh] lg:h-auto lg:min-h-0 flex flex-col justify-center lg:block lg:py-4 lg:mb-6 animate-fade-in relative overflow-hidden lg:overflow-visible border-b-0 lg:border-b border-white/5 bg-black lg:bg-transparent"
                     
                     if (item.type === 'post' && item.post) {
                        return (
                           <div key={`post-${item.post.id}`} className={itemClass} style={{ animationDelay: `${index * 50}ms` }}>
                             {/* On mobile, we might need a container to center the post if it is short */}
                             <div className="w-full h-full lg:h-auto flex items-center justify-center lg:block">
                                <PostCard 
                                  post={item.post} 
                                  onLike={handleLike}
                                  onSave={() => {}}
                                  onShare={() => {}}
                                  onComment={(id) => setOpenComments(openComments === id ? null : id)}
                                  isCommentOpen={openComments === item.post.id}
                                  onSendComment={(id, text) => console.log('Comment', id, text)}
                                />
                             </div>
                           </div>
                        )
                     }

                     if (item.type === 'event' && item.event) {
                       return (
                          <div key={`ev-${item.event.id}`} className={itemClass} style={{ animationDelay: `${index * 50}ms` }}>
                              <EventCardFeed event={item.event} />
                          </div>
                       )
                     }
                     if (item.type === 'course' && item.course) {
                       return (
                          <div key={`c-${item.course.id}`} className={itemClass} style={{ animationDelay: `${index * 50}ms` }}>
                              <CourseCardFeed course={item.course} />
                          </div>
                       )
                     }
                     return null
                   })
                 )}
               </div>
               
               {/* Bottom Spacer for Mobile Nav/Safe Area */}
               <div className="h-20 lg:h-12 w-full"></div>
             </div>
          </div>

          {/* Right Sidebar - Suggestions (Desktop) */}
          <div className="hidden xl:block w-80 flex-shrink-0 h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide sticky top-24">
             <div className="space-y-6">
                <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-6">
                   <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-white">Próximos Eventos</h3>
                      <Link to="/calendario" className="text-xs text-purple-400 hover:text-purple-300">Ver todos</Link>
                   </div>
                   <div className="space-y-4">
                      {MOCK_EVENTS.slice(0, 3).map(ev => (
                         <div key={ev.id} className="flex gap-3 group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
                            <div className="w-12 h-12 bg-dark-bg rounded-lg flex flex-col items-center justify-center text-center border border-dark-border group-hover:border-purple-500/50 transition-colors">
                               <span className="text-xs font-bold text-red-400 uppercase">{new Date(ev.date).toLocaleString('default', { month: 'short' }).replace('.', '')}</span>
                               <span className="text-lg font-bold text-white leading-none">{new Date(ev.date).getDate()}</span>
                            </div>
                            <div>
                               <p className="text-sm font-bold text-white line-clamp-1 group-hover:text-purple-400 transition-colors">{ev.title}</p>
                               <p className="text-xs text-gray-500">{ev.time} • {ev.location}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}

