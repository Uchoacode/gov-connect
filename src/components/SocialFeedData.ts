export interface Post {
  id: string
  user: string
  userAvatar: string
  role: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  time: string
  isLiked?: boolean
  isSaved?: boolean
  isVerified?: boolean
  type: 'post' | 'event' | 'job'
  eventData?: {
    date: string
    location: string
    attendees: number
  }
  isAttending?: boolean
}

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    user: 'Ana Paula Rodrigues',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
    role: 'Gestora de Projetos • Ministério da Tecnologia',
    time: '2h',
    content: 'Acabamos de lançar o novo portal de transparência! 🚀 Um grande passo para a modernização do setor público. Confiram no link abaixo e deixem seus feedbacks!',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    likes: 124,
    comments: 42,
    shares: 15,
    isLiked: true,
    isSaved: false,
    type: 'post',
    isVerified: true
  },
  {
    id: '2',
    user: 'Bruno Fernandes',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
    role: 'Diretor de Inovação • GovTech',
    time: '4h',
    content: 'Incrível ver a adesão dos servidores ao novo programa de capacitação em IA. Mais de 5.000 inscritos em 24 horas! 🤖📚',
    likes: 890,
    comments: 156,
    shares: 89,
    isLiked: false,
    isSaved: true,
    type: 'post',
    isVerified: true
  },
  {
    id: '3',
    user: 'Conferência Nacional de Inovação',
    userAvatar: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=150&auto=format&fit=crop',
    role: 'Evento Oficial',
    time: '1d',
    content: '📅 Reserve a data! A maior conferência de inovação pública da América Latina está chegando. Palestrantes internacionais, workshops e muito networking.',
    image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop',
    likes: 2400,
    comments: 340,
    shares: 500,
    isLiked: false,
    isSaved: false,
    type: 'event',
    eventData: {
      date: '15 SET',
      location: 'Centro de Convenções, Brasília',
      attendees: 1250 
    },
    isVerified: true
  }
]
