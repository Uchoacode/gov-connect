import { useState } from 'react'

interface ApplicationModalProps {
  jobId: string
  jobTitle: string
  company: string
  onClose: () => void
}

export default function ApplicationModal({ jobId, jobTitle, company, onClose }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    // Simular envio
    setTimeout(() => {
      alert('Candidatura enviada com sucesso!')
      setSubmitting(false)
      onClose()
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Candidatar-se</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-1">{jobTitle}</h3>
          <p className="text-gray-400">{company}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Currículo (URL ou texto) *
            </label>
            <textarea
              required
              rows={4}
              value={formData.resume}
              onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Cole o link do seu currículo ou descreva sua experiência..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Carta de Apresentação
            </label>
            <textarea
              rows={4}
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Por que você é a pessoa ideal para esta vaga?"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all disabled:opacity-50"
            >
              {submitting ? 'Enviando...' : 'Enviar Candidatura'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-dark-border rounded-xl font-semibold text-gray-300 hover:bg-dark-bg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
