'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

interface Documento {
  id: string
  title: string
  type: string
  size: string
  category: string
  uploadDate: string
  downloads: number
}

export default function BibliotecaPage() {
  const [documentos, setDocumentos] = useState<Documento[]>([
    {
      id: '1',
      title: 'Manual de Gestão Pública 2024',
      type: 'PDF',
      size: '2.5 MB',
      category: 'Manuais',
      uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      downloads: 1234,
    },
    {
      id: '2',
      title: 'Guia de Licitações Públicas',
      type: 'PDF',
      size: '1.8 MB',
      category: 'Legislação',
      uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      downloads: 856,
    },
    {
      id: '3',
      title: 'Relatório Anual de Transparência 2023',
      type: 'PDF',
      size: '5.2 MB',
      category: 'Relatórios',
      uploadDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      downloads: 2103,
    },
    {
      id: '4',
      title: 'Planilha de Controle de Contratos',
      type: 'XLSX',
      size: '450 KB',
      category: 'Templates',
      uploadDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      downloads: 567,
    },
  ])

  const categories = ['Todos', 'Manuais', 'Legislação', 'Relatórios', 'Templates', 'Formulários']

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
            📚 Biblioteca de Documentos
          </h1>
          <p className="text-gray-400">Acesse documentos, manuais e materiais do setor público</p>
        </div>

        {/* Busca e filtros */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="🔍 Buscar documentos..."
            className="flex-1 px-4 py-3 bg-dark-bgSecondary border border-dark-border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <select className="px-4 py-3 bg-dark-bgSecondary border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500">
            <option>Todos os tipos</option>
            <option>PDF</option>
            <option>XLSX</option>
            <option>DOCX</option>
          </select>
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

        {/* Lista de documentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentos.map(doc => (
            <div
              key={doc.id}
              className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition-all card-hover"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">
                  {doc.type === 'PDF' ? '📄' : doc.type === 'XLSX' ? '📊' : '📝'}
                </div>
                <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
                  {doc.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{doc.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                <span>{doc.type}</span>
                <span>{doc.size}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">
                  📥 {doc.downloads} downloads
                </span>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
