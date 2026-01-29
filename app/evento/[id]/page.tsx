'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import Navbar from '@/components/Navbar'
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

export default function EventoPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvent()
  }, [params.id])

  const fetchEvent = async () => {
    try {
      const response = await fetch(`/api/eventos/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setEvent(data)
        // Incrementar visualizações
        fetch(`/api/eventos/${params.id}/view`, { method: 'POST' })
      }
    } catch (error) {
      console.error('Erro ao carregar evento:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-4">Evento não encontrado</p>
            <Link href="/feed" className="text-purple-400 hover:text-purple-300">
              Voltar ao feed
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const eventDate = new Date(event.date)

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      {/* Banner */}
      {(event.banner || event.image) && (
        <div className="w-full h-96 bg-gray-900 relative">
          <img
            src={event.banner || event.image}
            alt={event.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent"></div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {event.area && (
              <span className="inline-block bg-purple-500/20 text-purple-300 text-sm font-semibold px-3 py-1 rounded-full border border-purple-500/30">
                {event.area}
              </span>
            )}
            <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full border ${
              event.modality === 'online' 
                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                : event.modality === 'hibrido'
                ? 'bg-green-500/20 text-green-300 border-green-500/30'
                : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
            }`}>
              {event.modality === 'online' ? '🌐 Online' : event.modality === 'hibrido' ? '🔄 Híbrido' : '📍 Presencial'}
            </span>
            {event.isFree ? (
              <span className="inline-block bg-green-500/20 text-green-300 text-sm font-semibold px-3 py-1 rounded-full border border-green-500/30">
                ✓ Gratuito
              </span>
            ) : (
              <span className="inline-block bg-yellow-500/20 text-yellow-300 text-sm font-semibold px-3 py-1 rounded-full border border-yellow-500/30">
                💰 {event.price || 'Pago'}
              </span>
            )}
            {event.certification && (
              <span className="inline-block bg-blue-neon/20 text-blue-neon text-sm font-semibold px-3 py-1 rounded-full border border-blue-neon/30">
                🎓 Certificado
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">{event.title}</h1>
          
          <Link href={`/organizador/${event.organizerId}`} className="flex items-center space-x-3 hover:opacity-80 transition-opacity mb-6">
            {event.user.avatar ? (
              <img
                src={event.user.avatar}
                alt={event.user.name}
                className="w-12 h-12 rounded-full border-2 border-purple-500"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                {event.user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="font-semibold text-white">{event.organizer}</p>
              <p className="text-sm text-gray-400">{event.user.name}</p>
            </div>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descrição */}
            <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Sobre o Evento</h2>
              <p className="text-gray-300 whitespace-pre-line">{event.description}</p>
            </div>

            {/* Programação */}
            {event.program && (
              <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Programação</h2>
                <div className="text-gray-300 whitespace-pre-line">{event.program}</div>
              </div>
            )}

            {/* Público-alvo */}
            {event.targetAudience && (
              <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4">Público-Alvo</h2>
                <p className="text-gray-300">{event.targetAudience}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6 sticky top-24">
              {/* Informações */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold text-white">Data e Horário</span>
                  </div>
                  <p className="text-gray-300 ml-7">
                    {format(eventDate, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </p>
                  {event.time && (
                    <p className="text-gray-300 ml-7">às {event.time}</p>
                  )}
                </div>

                {event.location && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <svg className="w-5 h-5 text-blue-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-semibold text-white">Local</span>
                    </div>
                    <p className="text-gray-300 ml-7">{event.location}</p>
                  </div>
                )}
              </div>

              {/* Botão de Inscrição */}
              {event.registrationLink && (
                <button
                  onClick={() => window.open(event.registrationLink, '_blank')}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all glow-purple mb-4 text-lg"
                >
                  Inscreva-se Agora →
                </button>
              )}

              <div className="text-center text-sm text-gray-400">
                <p>{event.views} visualizações</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
