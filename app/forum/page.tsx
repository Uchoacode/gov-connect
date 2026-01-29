'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

interface Topico {
  id: string
  title: string
  content: string
  author: string
  category: string
  replies: number
  views: number
  lastActivity: string
  isPinned?: boolean
}

export default function ForumPage() {
  const [topicos, setTopicos] = useState<Topico[]>([
    {
      id: '1',
      title: 'Como melhorar a eficiência na gestão pública?',
      content: 'Compartilhem experiências e boas práticas para otimizar processos no setor público.',
      author: 'Servidor Público',
      category: 'Gestão',
      replies: 23,
      views: 456,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      isPinned: true,
    },
    {
      id: '2',
      title: 'Novas tecnologias para o setor público',
      content: 'Discussão sobre implementação de soluções tecnológicas inovadoras.',
      author: 'Analista TI',
      category: 'Tecnologia',
      replies: 15,
      views: 289,
      lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      title: 'Capacitação e desenvolvimento profissional',
      content: 'Troca de informações sobre cursos, treinamentos e oportunidades de capacitação.',
      author: 'RH Público',
      category: 'Capacitação',
      replies: 31,
      views: 678,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
  ])

  const categories = ['Todos', 'Gestão', 'Tecnologia', 'Capacitação', 'Legislação', 'Dúvidas']

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
              💬 Fórum de Discussão
            </h1>
            <p className="text-gray-400">Compartilhe experiências e tire dúvidas com outros servidores</p>
          </div>
          <button className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all">
            + Novo Tópico
          </button>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              className="px-4 py-2 rounded-lg font-medium transition-all bg-dark-bgSecondary border border-dark-border text-gray-400 hover:text-white hover:border-purple-500/50"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de tópicos */}
        <div className="space-y-4">
          {topicos.map(topico => (
            <div
              key={topico.id}
              className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {topico.isPinned && (
                      <span className="text-yellow-400 text-sm">📌</span>
                    )}
                    <h3 className="text-xl font-bold text-white">{topico.title}</h3>
                    <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                      {topico.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{topico.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Por {topico.author}</span>
                    <span>💬 {topico.replies} respostas</span>
                    <span>👁️ {topico.views} visualizações</span>
                    <span>Ativo há {Math.floor((Date.now() - new Date(topico.lastActivity).getTime()) / (60 * 60 * 1000))}h</span>
                  </div>
                </div>
                <button className="text-purple-400 hover:text-purple-300 font-medium">
                  Ver →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
