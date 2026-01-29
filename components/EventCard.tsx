import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link } from 'react-router-dom'
import { useState } from 'react'

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

interface EventCardProps {
  event: Event
  currentUserId?: string
  isReelMode?: boolean
}

export default function EventCard({ event, currentUserId, isReelMode = false }: EventCardProps) {
  const [saved, setSaved] = useState(false)
  const eventDate = new Date(event.date)

  const handleSave = async () => {
    // Login temporariamente desabilitado
    // if (!currentUserId) return
    // TODO: Implementar salvar evento
    setSaved(!saved)
  }

  const handleRegistrationClick = () => {
    if (event.registrationLink) {
      window.open(event.registrationLink, '_blank')
    }
  }

  if (isReelMode) {
    return (
      <div className="w-full max-w-4xl h-full max-h-[85dvh] sm:max-h-[85vh] bg-dark-bgSecondary border border-dark-border rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-sm flex flex-col shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 group animate-border-glow">
          {/* Banner Full com overlay melhorado */}
          {(event.banner || event.image) && (
            <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-purple-900/50 to-orange-900/50 relative overflow-hidden flex-shrink-0 group">
              <img
                src={event.banner || event.image}
                alt={event.title}
                className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bgSecondary via-purple-900/20 to-transparent"></div>
              {/* Overlay com efeito shimmer */}
              <div className="absolute inset-0 shimmer opacity-30"></div>
            {/* Header no topo da imagem */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
              <Link to={`/organizador/${event.organizerId}`} className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
                {event.user.avatar ? (
                  <img
                    src={event.user.avatar}
                    alt={event.user.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/30 backdrop-blur-sm"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-base sm:text-lg">
                    {event.user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-bold text-white text-base sm:text-lg drop-shadow-lg leading-tight">{event.user.name}</p>
                  <p className="text-[10px] sm:text-xs text-white/80 drop-shadow">
                    {format(new Date(event.createdAt), "d 'de' MMMM", { locale: ptBR })}
                  </p>
                </div>
              </Link>
              <button
                onClick={handleSave}
                className={`p-2 sm:p-3 rounded-full backdrop-blur-md transition-all ${
                  saved ? 'bg-yellow-500/80 text-yellow-900' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          <Link to={`/evento/${event.id}`}>
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-400 hover:to-orange-400 hover:bg-clip-text hover:text-transparent transition-all leading-tight">
              {event.title}
            </h2>
          </Link>
          
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            {event.area && (
              <span className="inline-block bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-purple-400/40 backdrop-blur-sm">
                {event.area}
              </span>
            )}
            <span className={`inline-block text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border backdrop-blur-sm ${
              event.modality === 'online' 
                ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-200 border-blue-400/40'
                : event.modality === 'hibrido'
                ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 border-green-400/40'
                : 'bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-orange-200 border-orange-400/40'
            }`}>
              {event.modality === 'online' ? '🌐 Online' : event.modality === 'hibrido' ? '🔄 Híbrido' : '📍 Presencial'}
            </span>
            {event.isFree ? (
              <span className="inline-block bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-green-400/40 backdrop-blur-sm">
                ✓ Gratuito
              </span>
            ) : (
              <span className="inline-block bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-yellow-200 text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-yellow-400/40 backdrop-blur-sm">
                💰 {event.price || 'Pago'}
              </span>
            )}
          </div>

          <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 line-clamp-4 whitespace-pre-line leading-relaxed">{event.description}</p>

          {/* Informações do evento */}
          <div className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-white">
                {format(eventDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </span>
              {event.time && <span>às {event.time}</span>}
            </div>

            {event.location && (
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-base sm:text-lg">{event.location}</span>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Organizador: <span className="text-white font-semibold">{event.organizer}</span></span>
            </div>
          </div>

          {/* Botão de inscrição melhorado */}
          {event.registrationLink && (
            <button
              onClick={handleRegistrationClick}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-3 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-lg sm:text-xl hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all glow-purple transform hover:scale-[1.02] shadow-2xl relative overflow-hidden group/btn pulse-glow mb-2"
            >
              <span className="relative z-10">Inscreva-se Agora →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="card-hover bg-dark-bgSecondary border border-dark-border rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Header com avatar e nome */}
      <div className="p-6 border-b border-dark-border/50">
        <div className="flex items-center justify-between">
          <Link to={`/organizador/${event.organizerId}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            {event.user.avatar ? (
              <img
                src={event.user.avatar}
                alt={event.user.name}
                className="w-10 h-10 rounded-full border-2 border-purple-500"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                {event.user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-semibold text-white">{event.user.name}</p>
              <p className="text-xs text-gray-400">
                {format(new Date(event.createdAt), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
          </Link>
          {/* Botão salvar sempre visível para testes */}
          <button
            onClick={handleSave}
            className={`p-2 rounded-lg transition-colors ${
              saved ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
            }`}
          >
            <svg className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Imagem do evento */}
      {(event.banner || event.image) && (
        <div className="w-full h-72 bg-gradient-to-br from-purple-900/50 to-orange-900/50 relative overflow-hidden">
          <img
            src={event.banner || event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bgSecondary via-transparent to-transparent"></div>
        </div>
      )}

      {/* Conteúdo do evento */}
      <div className="p-6">
        <Link to={`/evento/${event.id}`}>
          <h2 className="text-3xl font-bold text-white mb-4 hover:bg-gradient-to-r hover:from-purple-400 hover:via-pink-400 hover:to-orange-400 hover:bg-clip-text hover:text-transparent transition-all">
            {event.title}
          </h2>
        </Link>
        
        <div className="flex flex-wrap gap-3 mb-5">
          {event.area && (
            <span className="inline-block bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 text-xs font-bold px-4 py-2 rounded-full border border-purple-400/40 backdrop-blur-sm hover:scale-110 transition-transform cursor-default">
              {event.area}
            </span>
          )}
          <span className={`inline-block text-xs font-bold px-4 py-2 rounded-full border backdrop-blur-sm ${
            event.modality === 'online' 
              ? 'bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-200 border-blue-400/40'
              : event.modality === 'hibrido'
              ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 border-green-400/40'
              : 'bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-orange-200 border-orange-400/40'
          }`}>
            {event.modality === 'online' ? '🌐 Online' : event.modality === 'hibrido' ? '🔄 Híbrido' : '📍 Presencial'}
          </span>
          {event.isFree ? (
            <span className="inline-block bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 text-xs font-bold px-4 py-2 rounded-full border border-green-400/40 backdrop-blur-sm">
              ✓ Gratuito
            </span>
          ) : (
            <span className="inline-block bg-gradient-to-r from-yellow-500/30 to-orange-500/30 text-yellow-200 text-xs font-bold px-4 py-2 rounded-full border border-yellow-400/40 backdrop-blur-sm">
              💰 {event.price || 'Pago'}
            </span>
          )}
          {event.certification && (
            <span className="inline-block bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 text-xs font-bold px-4 py-2 rounded-full border border-purple-400/40 backdrop-blur-sm">
              🎓 Certificado
            </span>
          )}
        </div>

        <p className="text-gray-300 mb-4 line-clamp-3 whitespace-pre-line">{event.description}</p>

        {/* Informações do evento */}
        <div className="space-y-2 text-sm text-gray-400 mb-6">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium text-white">
              {format(eventDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </span>
            {event.time && <span>às {event.time}</span>}
          </div>

          {event.location && (
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-blue-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{event.location}</span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Organizador: <span className="text-white">{event.organizer}</span></span>
          </div>
        </div>

        {/* Botão de inscrição */}
        {event.registrationLink && (
          <button
            onClick={handleRegistrationClick}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all glow-purple transform hover:scale-[1.02]"
          >
            Inscreva-se Agora →
          </button>
        )}
      </div>
    </div>
  )
}
