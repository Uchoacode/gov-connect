'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

interface Curso {
  id: string
  title: string
  description: string
  duration: string
  modality: string
  level: string
  instructor: string
  students: number
  rating: number
  isFree: boolean
}

export default function CursosPage() {
  const [cursos, setCursos] = useState<Curso[]>([
    {
      id: '1',
      title: 'Gestão Pública Moderna',
      description: 'Aprenda as melhores práticas de gestão no setor público com foco em eficiência e transparência.',
      duration: '40 horas',
      modality: 'Online',
      level: 'Intermediário',
      instructor: 'Prof. João Silva',
      students: 1234,
      rating: 4.8,
      isFree: true,
    },
    {
      id: '2',
      title: 'Licitações e Contratos Públicos',
      description: 'Curso completo sobre legislação de licitações, modalidades e elaboração de editais.',
      duration: '60 horas',
      modality: 'Híbrido',
      level: 'Avançado',
      instructor: 'Dra. Maria Santos',
      students: 856,
      rating: 4.9,
      isFree: false,
    },
    {
      id: '3',
      title: 'Tecnologia no Setor Público',
      description: 'Transformação digital, governo eletrônico e inovação tecnológica na administração pública.',
      duration: '30 horas',
      modality: 'Online',
      level: 'Básico',
      instructor: 'Eng. Carlos Oliveira',
      students: 2103,
      rating: 4.7,
      isFree: true,
    },
  ])

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
            🎓 Cursos e Capacitações
          </h1>
          <p className="text-gray-400">Desenvolva suas competências com cursos especializados</p>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-wrap gap-4">
          <select className="px-4 py-2 bg-dark-bgSecondary border border-dark-border rounded-lg text-white">
            <option>Todas as modalidades</option>
            <option>Online</option>
            <option>Presencial</option>
            <option>Híbrido</option>
          </select>
          <select className="px-4 py-2 bg-dark-bgSecondary border border-dark-border rounded-lg text-white">
            <option>Todos os níveis</option>
            <option>Básico</option>
            <option>Intermediário</option>
            <option>Avançado</option>
          </select>
          <button className="px-4 py-2 bg-dark-bgSecondary border border-dark-border rounded-lg text-white hover:border-purple-500/50">
            Apenas Grátis
          </button>
        </div>

        {/* Lista de cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map(curso => (
            <div
              key={curso.id}
              className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition-all card-hover"
            >
              {curso.isFree && (
                <div className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-2 py-1 rounded-full mb-3">
                  ✓ Grátis
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{curso.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{curso.description}</p>
              
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center text-gray-400">
                  <span className="mr-2">⏱️</span>
                  <span>{curso.duration}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <span className="mr-2">💻</span>
                  <span>{curso.modality}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <span className="mr-2">📊</span>
                  <span>{curso.level}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <span className="mr-2">👨‍🏫</span>
                  <span>{curso.instructor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-white font-bold">{curso.rating}</span>
                  <span className="text-gray-400 text-sm">({curso.students} alunos)</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-bold hover:from-purple-600 hover:to-pink-600 transition-all">
                {curso.isFree ? 'Inscrever-se Grátis' : 'Ver Detalhes'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
