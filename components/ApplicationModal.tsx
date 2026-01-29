'use client'

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
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('/api/vagas/candidatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          jobId,
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    } catch (error) {
      console.error('Erro ao enviar candidatura:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-dark-bgSecondary border border-dark-border rounded-3xl p-12 max-w-md text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-white mb-2">Candidatura Enviada!</h2>
          <p className="text-gray-400">Sua candidatura foi enviada com sucesso. Boa sorte!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-dark-bgSecondary border border-dark-border rounded-3xl p-8 max-w-2xl w-full my-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Enviar Currículo</h2>
            <p className="text-gray-400">{jobTitle} - {company}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Currículo / Link do LinkedIn *
            </label>
            <input
              type="text"
              name="resume"
              value={formData.resume}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="Link do LinkedIn ou cole aqui seu currículo"
              required
            />
            <p className="mt-2 text-sm text-gray-500">
              Cole o link do seu perfil do LinkedIn ou cole o texto do seu currículo
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Carta de Apresentação (Opcional)
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="Conte-nos por que você se interessou por esta vaga..."
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-4 rounded-xl font-bold hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Enviando...' : 'Enviar Candidatura'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-4 border border-dark-border rounded-xl font-semibold text-gray-300 hover:bg-dark-bg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
