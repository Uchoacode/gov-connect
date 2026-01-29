'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

interface Noticia {
  id: string
  title: string
  content: string
  category: string
  author: string
  date: string
  image?: string
  isOfficial: boolean
  views: number
}

export default function NoticiasPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('todas')

  useEffect(() => {
    // Dados mockados de notícias do setor público
    const mockNoticias: Noticia[] = [
      {
        id: '1',
        title: 'Governo anuncia novo programa de capacitação para servidores',
        content: 'O programa visa qualificar mais de 10.000 servidores públicos em tecnologias digitais e gestão pública moderna.',
        category: 'Capacitação',
        author: 'Ministério da Gestão',
        date: new Date().toISOString(),
        isOfficial: true,
        views: 1234,
      },
      {
        id: '2',
        title: 'Portal da Transparência recebe atualização com novos dados',
        content: 'Agora é possível consultar informações detalhadas sobre licitações, contratos e despesas públicas em tempo real.',
        category: 'Transparência',
        author: 'Controladoria Geral',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        isOfficial: true,
        views: 856,
      },
      {
        id: '3',
        title: 'Nova lei simplifica processos de contratação pública',
        content: 'A legislação atualizada reduz burocracia e acelera a contratação de serviços essenciais para a população.',
        category: 'Legislação',
        author: 'Secretaria de Licitações',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        isOfficial: true,
        views: 2103,
      },
    ]
    setNoticias(mockNoticias)
    setLoading(false)
  }, [])

  const categories = ['todas', 'Capacitação', 'Transparência', 'Legislação', 'Eventos', 'Tecnologia']

  const filteredNoticias = selectedCategory === 'todas' 
    ? noticias 
    : noticias.filter(n => n.category === selectedCategory)

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
            📰 Notícias e Comunicados Oficiais
          </h1>
          <p className="text-gray-400">Fique por dentro das principais notícias do setor público</p>
        </div>

        {/* Filtros por categoria */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-dark-bgSecondary border border-dark-border text-gray-400 hover:text-white hover:border-purple-500/50'
              }`}
            >
              {cat === 'todas' ? '📋 Todas' : cat}
            </button>
          ))}
        </div>

        {/* Lista de notícias */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-border"></div>
              <p className="mt-4 text-gray-400">Carregando notícias...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNoticias.map(noticia => (
              <div
                key={noticia.id}
                className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition-all card-hover"
              >
                {noticia.isOfficial && (
                  <div className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded-full mb-3">
                    ✓ Oficial
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{noticia.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{noticia.content}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{noticia.author}</span>
                  <span>{new Date(noticia.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-purple-400 text-sm">👁️ {noticia.views} visualizações</span>
                  <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                    Ler mais →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
