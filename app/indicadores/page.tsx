'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

interface Indicador {
  id: string
  name: string
  value: number
  unit: string
  target: number
  trend: 'up' | 'down' | 'stable'
  category: string
}

export default function IndicadoresPage() {
  const [indicadores, setIndicadores] = useState<Indicador[]>([
    {
      id: '1',
      name: 'Taxa de Satisfação do Cidadão',
      value: 87,
      unit: '%',
      target: 90,
      trend: 'up',
      category: 'Qualidade',
    },
    {
      id: '2',
      name: 'Tempo Médio de Resposta',
      value: 2.3,
      unit: 'dias',
      target: 2.0,
      trend: 'down',
      category: 'Eficiência',
    },
    {
      id: '3',
      name: 'Processos Digitalizados',
      value: 78,
      unit: '%',
      target: 85,
      trend: 'up',
      category: 'Digitalização',
    },
    {
      id: '4',
      name: 'Economia com Licitações',
      value: 12.5,
      unit: '%',
      target: 10,
      trend: 'up',
      category: 'Economia',
    },
  ])

  const categories = ['Todos', 'Qualidade', 'Eficiência', 'Digitalização', 'Economia']

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
            📊 Indicadores e Estatísticas
          </h1>
          <p className="text-gray-400">Acompanhe métricas e desempenho do setor público</p>
        </div>

        {/* Filtros */}
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

        {/* Grid de indicadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {indicadores.map(ind => (
            <div
              key={ind.id}
              className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full mb-2 inline-block">
                    {ind.category}
                  </span>
                  <h3 className="text-white font-bold text-lg">{ind.name}</h3>
                </div>
                <span className={`text-2xl ${
                  ind.trend === 'up' ? 'text-green-400' : 
                  ind.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {ind.trend === 'up' ? '↑' : ind.trend === 'down' ? '↓' : '→'}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold text-white">
                    {ind.value}
                  </span>
                  <span className="text-gray-400">{ind.unit}</span>
                </div>
                <div className="text-sm text-gray-400">
                  Meta: {ind.target}{ind.unit}
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="w-full bg-dark-bg rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full ${
                    ind.value >= ind.target
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : ind.value >= ind.target * 0.8
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                      : 'bg-gradient-to-r from-red-500 to-pink-500'
                  }`}
                  style={{ width: `${Math.min((ind.value / ind.target) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">
                {((ind.value / ind.target) * 100).toFixed(1)}% da meta
              </div>
            </div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">Evolução Mensal</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              📈 Gráfico de linha interativo
            </div>
          </div>
          <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">Comparativo por Categoria</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              📊 Gráfico de barras
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
