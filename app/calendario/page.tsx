'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

interface EventoCalendario {
  id: string
  title: string
  date: string
  type: string
  location?: string
}

export default function CalendarioPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [eventos, setEventos] = useState<EventoCalendario[]>([
    { id: '1', title: 'Reunião de Planejamento', date: '2024-01-15', type: 'Reunião', location: 'Sala 101' },
    { id: '2', title: 'Workshop de Tecnologia', date: '2024-01-20', type: 'Evento', location: 'Auditório' },
    { id: '3', title: 'Prazo: Relatório Mensal', date: '2024-01-25', type: 'Prazo', location: undefined },
  ])

  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    // Dias vazios no início
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    // Dias do mês
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const days = getDaysInMonth(selectedDate)

  const eventosDoDia = (day: number | null) => {
    if (!day) return []
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return eventos.filter(e => e.date === dateStr)
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
            📅 Calendário de Eventos Públicos
          </h1>
          <p className="text-gray-400">Acompanhe eventos, prazos e atividades do setor público</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Calendário */}
          <div className="lg:col-span-2">
            <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-4 sm:p-6">
              {/* Header do calendário */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
                  className="text-gray-400 hover:text-white p-2"
                >
                  ←
                </button>
                <h2 className="text-base sm:text-lg md:text-xl font-bold text-white text-center">
                  {meses[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h2>
                <button
                  onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
                  className="text-gray-400 hover:text-white p-2"
                >
                  →
                </button>
              </div>

              {/* Dias da semana */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {diasSemana.map(dia => (
                  <div key={dia} className="text-center text-sm font-bold text-gray-400 py-2">
                    {dia}
                  </div>
                ))}
              </div>

              {/* Dias do mês */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {days.map((day, index) => {
                  const eventos = eventosDoDia(day)
                  const hasEvents = eventos.length > 0
                  
                  return (
                    <div
                      key={index}
                      className={`aspect-square p-1 sm:p-2 rounded-md sm:rounded-lg border transition-all ${
                        day === null
                          ? 'border-transparent'
                          : hasEvents
                          ? 'bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30'
                          : 'bg-dark-bg border-dark-border hover:border-purple-500/30'
                      }`}
                    >
                      {day && (
                        <>
                          <div className={`text-xs sm:text-sm font-medium ${hasEvents ? 'text-white' : 'text-gray-400'}`}>
                            {day}
                          </div>
                          {hasEvents && (
                            <div className="mt-0.5 sm:mt-1 space-y-0.5 sm:space-y-1">
                              {eventos.slice(0, 1).map(e => (
                                <div
                                  key={e.id}
                                  className="text-[10px] sm:text-xs bg-purple-500/30 rounded px-0.5 sm:px-1 truncate"
                                  title={e.title}
                                >
                                  {e.title}
                                </div>
                              ))}
                              {eventos.length > 1 && (
                                <div className="text-[10px] sm:text-xs text-purple-300">+{eventos.length - 1}</div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Lista de eventos */}
          <div className="space-y-4">
            <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Próximos Eventos</h3>
              <div className="space-y-3">
                {eventos.slice(0, 5).map(evento => (
                  <div
                    key={evento.id}
                    className="bg-dark-bg border border-dark-border rounded-lg p-3 hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white font-medium text-sm">{evento.title}</h4>
                      <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                        {evento.type}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      📅 {new Date(evento.date).toLocaleDateString('pt-BR')}
                      {evento.location && ` • 📍 ${evento.location}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all">
              + Adicionar Evento
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
