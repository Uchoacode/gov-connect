import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Story } from './StoriesBar'

const SLIDE_DURATION_MS = 5000

interface StoryViewerProps {
  story: Story
  onClose: () => void
}

/** Gera slides mock para o story (gradientes variados) */
function buildSlides(story: Story): { gradient: string; label: string }[] {
  const count = Math.max(1, story.storiesCount || 1)
  const gradients = [
    'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f97316 100%)',
    'linear-gradient(135deg, #ec4899 0%, #f97316 50%, #fbbf24 100%)',
    'linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #8b5cf6 100%)',
    'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
  ]
  return Array.from({ length: count }, (_, i) => ({
    gradient: gradients[i % gradients.length],
    label: `Story ${i + 1}`,
  }))
}

export default function StoryViewer({ story, onClose }: StoryViewerProps) {
  const navigate = useNavigate()
  const slides = buildSlides(story)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const handleViewProfile = () => {
    onClose()
    navigate(`/perfil/${story.userId}`)
  }

  const goNext = useCallback(() => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((i) => i + 1)
      setProgress(0)
    } else {
      onClose()
    }
  }, [currentIndex, slides.length, onClose])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1)
      setProgress(0)
    }
  }, [currentIndex])

  useEffect(() => {
    const step = 50
    const increment = (100 / (SLIDE_DURATION_MS / step))
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + increment
        if (next >= 100) {
          clearInterval(t)
          goNext()
          return 0
        }
        return next
      })
    }, step)
    return () => clearInterval(t)
  }, [currentIndex, goNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, goNext, goPrev])

  const slide = slides[currentIndex]
  const isImage = story.userAvatar.startsWith('http')

  // Função para gerar iniciais do nome
  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  // Função para gerar cor baseada no nome
  const getColorFromName = (name: string): string => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-orange-500 to-yellow-500',
      'from-green-500 to-emerald-500',
      'from-red-500 to-rose-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-cyan-500',
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
  }

  const initials = getInitials(story.userName)
  const gradientClass = getColorFromName(story.userName)

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`Story de ${story.userName}`}
    >
      {/* Barra de progresso por slide */}
      <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-3 sm:p-4">
        {slides.map((_, i) => (
          <div
            key={i}
            className="h-0.5 flex-1 rounded-full bg-white/30 overflow-hidden"
          >
            <div
              className="h-full rounded-full bg-white transition-all duration-75 ease-linear"
              style={{
                width: i < currentIndex ? '100%' : i === currentIndex ? `${progress}%` : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {/* Header: avatar, nome, horário, fechar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-3 pt-12 pb-2 sm:pt-14 sm:px-4 bg-gradient-to-b from-black/60 to-transparent">
        <button
          onClick={handleViewProfile}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
          aria-label={`Ver perfil de ${story.userName}`}
        >
          <div
            className={`w-10 h-10 rounded-full border-2 border-white/80 overflow-hidden flex-shrink-0 bg-gradient-to-br ${gradientClass} flex items-center justify-center text-white font-bold text-sm`}
            style={{
              backgroundImage: isImage ? `url(${story.userAvatar})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!isImage && (
              <span className="w-full h-full flex items-center justify-center">
                {initials}
              </span>
            )}
          </div>
          <div>
            <p className="text-white font-semibold text-sm sm:text-base">{story.userName}</p>
            <p className="text-white/70 text-xs">agora</p>
          </div>
        </button>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-white/90 hover:bg-white/20 transition-colors"
          aria-label="Fechar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Conteúdo do slide (centralizado) */}
      <div
        className="absolute inset-0 flex items-center justify-center p-4 pt-24 pb-8 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-full max-w-md aspect-[9/16] max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: slide.gradient }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <div
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white/50 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl mb-4 overflow-hidden bg-gradient-to-br ${gradientClass}`}
              style={{
                backgroundImage: isImage ? `url(${story.userAvatar})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {!isImage && <span>{initials}</span>}
            </div>
            <button
              onClick={handleViewProfile}
              className="text-white font-bold text-lg sm:text-xl drop-shadow-lg hover:underline"
            >
              {story.userName}
            </button>
            <p className="text-white/90 text-sm mt-1">{story.userRole}</p>
            <p className="text-white/70 text-xs mt-4">{slide.label}</p>
            <button
              onClick={handleViewProfile}
              className="mt-6 px-6 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full text-sm transition-all backdrop-blur-sm"
            >
              Ver Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Áreas clicáveis: esquerda = voltar, direita = avançar (abaixo do header) */}
      <div className="absolute top-16 left-0 right-0 bottom-0 flex z-10">
        <button
          type="button"
          className="flex-1 min-w-[33%] cursor-pointer bg-transparent border-0"
          onClick={goPrev}
          aria-label="Story anterior"
        />
        <button
          type="button"
          className="flex-1 min-w-[34%] cursor-pointer bg-transparent border-0"
          onClick={goNext}
          aria-label="Próximo story"
        />
      </div>
    </div>
  )
}
