import { useState } from 'react'
import Navbar from '../components/Navbar'

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: string
  description: string
}

export default function Calendario() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const events: Event[] = [
    {
      id: '1',
      title: 'Concurso Público - Inscrições',
      date: '2024-12-15',
      time: '09:00',
      location: 'Online',
      type: 'Concurso',
      description: 'Abertura das inscrições para concurso público',
    },
    {
      id: '2',
      title: 'Workshop de Gestão Pública',
      date: '2024-12-20',
      time: '14:00',
      location: 'Brasília - DF',
      type: 'Evento',
      description: 'Workshop sobre melhores práticas em gestão pública',
    },
    {
      id: '3',
      title: 'Palestra: Inovação no Setor Público',
      date: '2024-12-22',
      time: '10:00',
      location: 'Online',
      type: 'Palestra',
      description: 'Palestra sobre transformação digital',
    },
    {
      id: '4',
      title: 'Encerramento de Inscrições - Estágio',
      date: '2024-12-25',
      time: '23:59',
      location: 'Online',
      type: 'Vaga',
      description: 'Último dia para inscrições em programa de estágio',
    },
  ]

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear)
    const days = []

    // Dias vazios no início
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>)
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const dayEvents = events.filter(e => e.date === dateStr)
      
      days.push(
        <div
          key={day}
          className={`aspect-square p-2 border border-dark-border rounded-lg ${
            dayEvents.length > 0
              ? 'bg-purple-500/20 border-purple-500/50 hover:bg-purple-500/30'
              : 'bg-dark-bgSecondary hover:bg-dark-bg'
          } transition-all cursor-pointer`}
        >
          <div className="text-white font-semibold text-sm mb-1">{day}</div>
          {dayEvents.length > 0 && (
            <div className="text-xs text-purple-300">
              {dayEvents.length} {dayEvents.length === 1 ? 'evento' : 'eventos'}
            </div>
          )}
        </div>
      )
    }

    return days
  }

  return (
    <div className="min-h-screen bg-[#0f1014] overflow-x-hidden font-sans selection:bg-purple-500/30">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          📅 Calendário de Eventos
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendário */}
          <div className="lg:col-span-2 bg-[#1a1b23]/60 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => {
                  if (selectedMonth === 0) {
                    setSelectedMonth(11)
                    setSelectedYear(selectedYear - 1)
                  } else {
                    setSelectedMonth(selectedMonth - 1)
                  }
                }}
                className="text-white hover:text-purple-400 transition-colors"
              >
                ←
              </button>
              <h2 className="text-xl font-bold text-white">
                {months[selectedMonth]} {selectedYear}
              </h2>
              <button
                onClick={() => {
                  if (selectedMonth === 11) {
                    setSelectedMonth(0)
                    setSelectedYear(selectedYear + 1)
                  } else {
                    setSelectedMonth(selectedMonth + 1)
                  }
                }}
                className="text-white hover:text-purple-400 transition-colors"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                <div key={day} className="text-center text-gray-400 text-sm font-semibold">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {renderCalendar()}
            </div>
          </div>

          {/* Lista de Eventos */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Próximos Eventos</h3>
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-[#1a1b23]/60 backdrop-blur-md border border-white/5 rounded-xl p-4 hover:border-purple-500/50 transition-all card-hover"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-semibold flex-1">{event.title}</h4>
                  <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full ml-2">
                    {event.type}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{event.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <span>📅 {new Date(event.date).toLocaleDateString('pt-BR')}</span>
                  <span>⏰ {event.time}</span>
                  <span>📍 {event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
