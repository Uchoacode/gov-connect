'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'

export default function DenunciasPage() {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    anonymous: false,
    contact: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Denúncia registrada com sucesso! Seu protocolo é: DEN-' + Date.now())
    setFormData({ type: '', description: '', anonymous: false, contact: '' })
  }

  const tiposDenuncia = [
    { id: 'corrupcao', label: 'Corrupção', icon: '🚫' },
    { id: 'irregularidade', label: 'Irregularidade', icon: '⚠️' },
    { id: 'assédio', label: 'Assédio', icon: '🛡️' },
    { id: 'discriminacao', label: 'Discriminação', icon: '⚖️' },
    { id: 'outro', label: 'Outro', icon: '📝' },
  ]

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-2">
            🚨 Canal de Denúncias e Reclamações
          </h1>
          <p className="text-gray-400">Denuncie irregularidades de forma segura e anônima</p>
        </div>

        <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6 sm:p-8 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Tipo de Denúncia</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
            {tiposDenuncia.map(tipo => (
              <button
                key={tipo.id}
                onClick={() => setFormData({ ...formData, type: tipo.id })}
                className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all ${
                  formData.type === tipo.id
                    ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/50'
                    : 'bg-dark-bg border-dark-border hover:border-red-500/30'
                }`}
              >
                <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{tipo.icon}</div>
                <div className="text-xs sm:text-sm font-medium text-white">{tipo.label}</div>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Descrição da Denúncia *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Descreva detalhadamente a situação..."
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.anonymous}
                onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                className="w-4 h-4 text-red-500 bg-dark-bg border-dark-border rounded focus:ring-red-500"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-300">
                Denúncia anônima
              </label>
            </div>

            {!formData.anonymous && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Contato (opcional)
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Email ou telefone"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-bold hover:from-red-600 hover:to-orange-600 transition-all"
            >
              Enviar Denúncia
            </button>
          </form>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
          <h3 className="text-blue-300 font-bold mb-2">ℹ️ Informações Importantes</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• Sua denúncia será tratada com total sigilo</li>
            <li>• Você receberá um protocolo para acompanhamento</li>
            <li>• Denúncias anônimas também são investigadas</li>
            <li>• O prazo médio de resposta é de 30 dias</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
