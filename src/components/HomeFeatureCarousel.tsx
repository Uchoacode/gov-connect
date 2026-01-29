import { useRef } from 'react'
import { BriefcaseIcon, FeedIcon, UsersIcon, GraduationIcon } from './Icons'
import { Link } from 'react-router-dom'

export default function HomeFeatureCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      id: 'feed',
      title: 'Feed Interativo',
      description: 'Acompanhe novidades, eventos e atualizações do setor público em tempo real.',
      icon: <FeedIcon className="w-8 h-8" />,
      link: '/feed',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
      id: 'vagas',
      title: 'Oportunidades',
      description: 'Encontre vagas, concursos e oportunidades de mobilidade no serviço público.',
      icon: <BriefcaseIcon className="w-8 h-8" />,
      link: '/vagas',
      color: 'bg-green-500/10 text-green-400 border-green-500/20'
    },
    {
      id: 'govers',
      title: 'Rede Gov',
      description: 'Conecte-se com outros servidores, compartilhe experiências e expanda seu network.',
      icon: <UsersIcon className="w-8 h-8" />,
      link: '/govers',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
      id: 'cursos',
      title: 'Capacitação',
      description: 'Acesse cursos e materiais para desenvolver suas habilidades de gestão.',
      icon: <GraduationIcon className="w-8 h-8" />,
      link: '/cursos',
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    }
  ]

  return (
    <div className="w-full py-12 animate-fade-in-up">
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="text-2xl font-semibold text-white">Explorar Plataforma</h2>
        <div className="flex gap-2">
            <button 
                onClick={() => scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' })}
                className="p-2 rounded-full border border-dark-border hover:bg-dark-bgSecondary text-gray-400 transition-colors"
            >
                ←
            </button>
            <button 
                onClick={() => scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' })}
                className="p-2 rounded-full border border-dark-border hover:bg-dark-bgSecondary text-gray-400 transition-colors"
            >
                →
            </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-4 pb-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {features.map((feature) => (
          <Link 
            key={feature.id}
            to={feature.link}
            className={`min-w-[280px] md:min-w-[320px] p-6 rounded-2xl border ${feature.color} border-opacity-30 bg-dark-bgSecondary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 snap-center group`}
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${feature.color} bg-opacity-20`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {feature.description}
            </p>
            <span className="text-sm font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
              Acessar <span className="text-lg">→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
