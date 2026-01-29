'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

interface TransparenciaItem {
  id: string
  title: string
  value: string
  period: string
  category: string
  trend?: 'up' | 'down' | 'stable'
}

export default function TransparenciaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('despesas')

  const dados: Record<string, TransparenciaItem[]> = {
    despesas: [
      { id: '1', title: 'Despesas Totais', value: 'R$ 2.450.000.000', period: '2024', category: 'despesas', trend: 'up' },
      { id: '2', title: 'Pessoal e Encargos', value: 'R$ 1.200.000.000', period: '2024', category: 'despesas', trend: 'stable' },
      { id: '3', title: 'Investimentos', value: 'R$ 350.000.000', period: '2024', category: 'despesas', trend: 'up' },
    ],
    receitas: [
      { id: '4', title: 'Receitas Totais', value: 'R$ 2.800.000.000', period: '2024', category: 'receitas', trend: 'up' },
      { id: '5', title: 'Impostos', value: 'R$ 1.500.000.000', period: '2024', category: 'receitas', trend: 'up' },
      { id: '6', title: 'Transferências', value: 'R$ 800.000.000', period: '2024', category: 'receitas', trend: 'stable' },
    ],
    licitacoes: [
      { id: '7', title: 'Licitações em Andamento', value: '127', period: 'Atual', category: 'licitacoes', trend: 'up' },
      { id: '8', title: 'Valor Total Licitações', value: 'R$ 450.000.000', period: '2024', category: 'licitacoes', trend: 'up' },
      { id: '9', title: 'Contratos Ativos', value: '342', period: 'Atual', category: 'licitacoes', trend: 'stable' },
    ],
  }

  const categories = [
    { id: 'despesas', label: '💰 Despesas', icon: '💰' },
    { id: 'receitas', label: '💵 Receitas', icon: '💵' },
    { id: 'licitacoes', label: '📋 Licitações', icon: '📋' },
    { id: 'contratos', label: '📄 Contratos', icon: '📄' },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
            🔍 Portal da Transparência
          </h1>
          <p className="text-gray-400">Acesso transparente a dados públicos e informações governamentais</p>
        </div>

        {/* Categorias */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-4 rounded-xl border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50'
                  : 'bg-dark-bgSecondary border-dark-border hover:border-purple-500/30'
              }`}
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <div className="text-sm font-medium text-white">{cat.label.split(' ')[1]}</div>
            </button>
          ))}
        </div>

        {/* Dados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dados[selectedCategory]?.map(item => (
            <div
              key={item.id}
              className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6 hover:border-purple-500/50 transition-all"
            >
              <h3 className="text-gray-400 text-sm mb-2">{item.title}</h3>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2">{item.value}</div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-xs">Período: {item.period}</span>
                {item.trend && (
                  <span className={`text-xs font-bold ${
                    item.trend === 'up' ? 'text-green-400' : 
                    item.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Ações */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6 text-left hover:border-purple-500/50 transition-all">
            <h3 className="text-white font-bold mb-2">📊 Relatórios Detalhados</h3>
            <p className="text-gray-400 text-sm">Acesse relatórios completos e análises detalhadas</p>
          </button>
          <button className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6 text-left hover:border-purple-500/50 transition-all">
            <h3 className="text-white font-bold mb-2">📥 Download de Dados</h3>
            <p className="text-gray-400 text-sm">Baixe dados em formato CSV, Excel ou JSON</p>
          </button>
        </div>
      </div>
    </div>
  )
}
