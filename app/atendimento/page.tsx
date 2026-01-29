'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

interface Mensagem {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: string
}

export default function AtendimentoPage() {
  const [messages, setMessages] = useState<Mensagem[]>([
    {
      id: '1',
      text: 'Olá! Como posso ajudá-lo hoje?',
      sender: 'bot',
      timestamp: new Date().toISOString(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleSend = () => {
    if (!inputMessage.trim()) return

    const newMessage: Mensagem = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, newMessage])
    setInputMessage('')

    // Resposta automática do bot
    setTimeout(() => {
      const botResponse: Mensagem = {
        id: (Date.now() + 1).toString(),
        text: 'Obrigado pela sua mensagem! Nossa equipe entrará em contato em breve.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  const quickQuestions = [
    'Como me candidatar a uma vaga?',
    'Onde encontro documentos?',
    'Como faço uma denúncia?',
    'Horário de atendimento',
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
            💬 Atendimento ao Cidadão
          </h1>
          <p className="text-gray-400">Tire suas dúvidas e obtenha suporte</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Chat */}
          <div className="lg:col-span-2">
            <div className="bg-dark-bgSecondary border border-dark-border rounded-xl h-[500px] sm:h-[600px] flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-dark-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Atendimento Virtual</h3>
                    <p className="text-gray-400 text-xs">Online agora</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-dark-bg border border-dark-border text-gray-300'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-dark-border">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Perguntas Rápidas</h3>
              <div className="space-y-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setInputMessage(q)}
                    className="w-full text-left px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-gray-300 hover:border-purple-500/50 hover:text-white transition-all text-sm"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">Contatos</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-gray-400">📞 Telefone</p>
                  <p className="text-white">0800 123 4567</p>
                </div>
                <div>
                  <p className="text-gray-400">✉️ Email</p>
                  <p className="text-white">atendimento@gov.br</p>
                </div>
                <div>
                  <p className="text-gray-400">🕐 Horário</p>
                  <p className="text-white">Seg-Sex: 8h às 18h</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
