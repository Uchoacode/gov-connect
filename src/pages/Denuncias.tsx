import { useState } from 'react'
import Navbar from '../components/Navbar'

export default function Denuncias() {
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    anonymous: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Denúncia registrada com sucesso! Seu caso será analisado.')
    setFormData({ type: '', description: '', anonymous: false })
  }

  return (
    <div className="min-h-screen bg-[#0f1014] overflow-x-hidden font-sans selection:bg-red-500/30">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">🚨 Canal de Denúncias</h1>

        <div className="bg-[#1a1b23]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 md:p-8">
          <p className="text-gray-400 mb-6">
            Use este canal para reportar irregularidades, corrupção ou qualquer violação no setor público.
            Sua identidade será mantida em sigilo.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Denúncia</label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Selecione</option>
                <option value="corrupcao">Corrupção</option>
                <option value="irregularidade">Irregularidade Administrativa</option>
                <option value="assédio">Assédio</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Descrição</label>
              <textarea
                rows={8}
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva detalhadamente o ocorrido..."
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="anonymous"
                checked={formData.anonymous}
                onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                className="w-5 h-5 rounded bg-dark-bg border-dark-border text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="anonymous" className="text-gray-300">
                Denúncia anônima
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:from-red-600 hover:via-pink-600 hover:to-purple-600 transition-all"
            >
              Enviar Denúncia
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
