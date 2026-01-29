'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

interface Orgao {
  id: string
  name: string
  type: string
  address: string
  phone: string
  email: string
  coordinates: { lat: number; lng: number }
}

export default function MapaPage() {
  const [orgaos, setOrgaos] = useState<Orgao[]>([
    {
      id: '1',
      name: 'Secretaria de Tecnologia',
      type: 'Secretaria',
      address: 'Brasília - DF, Setor de Edifícios Públicos',
      phone: '(61) 3333-4444',
      email: 'contato@setec.gov.br',
      coordinates: { lat: -15.7942, lng: -47.8822 },
    },
    {
      id: '2',
      name: 'Ministério da Administração',
      type: 'Ministério',
      address: 'Brasília - DF, Esplanada dos Ministérios',
      phone: '(61) 3333-5555',
      email: 'contato@mapa.gov.br',
      coordinates: { lat: -15.7997, lng: -47.8643 },
    },
    {
      id: '3',
      name: 'Tribunal de Contas',
      type: 'Órgão de Controle',
      address: 'São Paulo - SP, Av. Paulista',
      phone: '(11) 3333-6666',
      email: 'contato@tce.sp.gov.br',
      coordinates: { lat: -23.5505, lng: -46.6333 },
    },
  ])

  const [selectedOrgao, setSelectedOrgao] = useState<Orgao | null>(null)

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
            🗺️ Mapa de Órgãos Públicos
          </h1>
          <p className="text-gray-400">Localize órgãos, secretarias e instituições públicas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Lista de órgãos */}
          <div className="lg:col-span-1 space-y-3 sm:space-y-4">
            <input
              type="text"
              placeholder="🔍 Buscar órgão..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-dark-bgSecondary border border-dark-border rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
            />
            <div className="space-y-2 sm:space-y-3 max-h-[400px] sm:max-h-[600px] overflow-y-auto">
              {orgaos.map(orgao => (
                <div
                  key={orgao.id}
                  onClick={() => setSelectedOrgao(orgao)}
                  className={`bg-dark-bgSecondary border rounded-xl p-4 cursor-pointer transition-all ${
                    selectedOrgao?.id === orgao.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-dark-border hover:border-purple-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-bold">{orgao.name}</h3>
                    <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-full">
                      {orgao.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{orgao.address}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>📞 {orgao.phone}</span>
                    <span>✉️ {orgao.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-2">
            <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-4 sm:p-6 h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-400 mb-2">Mapa interativo</p>
                <p className="text-gray-500 text-sm">Selecione um órgão para ver sua localização</p>
                {selectedOrgao && (
                  <div className="mt-4 p-4 bg-dark-bg rounded-lg">
                    <p className="text-white font-bold">{selectedOrgao.name}</p>
                    <p className="text-gray-400 text-sm">{selectedOrgao.address}</p>
                    <p className="text-purple-400 text-xs mt-2">
                      📍 Coordenadas: {selectedOrgao.coordinates.lat}, {selectedOrgao.coordinates.lng}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
