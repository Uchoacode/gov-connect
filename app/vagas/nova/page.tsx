'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

const AREAS = [
  'Tecnologia',
  'Gestão Pública',
  'Direito',
  'Contabilidade',
  'Comunicação',
  'Recursos Humanos',
  'Administração',
  'Finanças',
]

export default function NovaVagaPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    type: 'estagio',
    area: '',
    requirements: '',
    benefits: '',
    salary: '',
    isRemote: false,
    applicationLink: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user?.userType !== 'organizer') {
      router.push('/vagas')
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/vagas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          userId: user?.id || 'temp-id',
        }),
      })

      if (response.ok) {
        router.push('/vagas')
      } else {
        const data = await response.json()
        setError(data.error || 'Erro ao criar vaga')
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Publicar Nova Vaga
        </h1>

        <form onSubmit={handleSubmit} className="bg-dark-bgSecondary border border-dark-border rounded-xl p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Título da Vaga *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                placeholder="Ex: Estagiário de Tecnologia"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Empresa/Órgão *
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descrição *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="Descreva a vaga detalhadamente..."
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de Vaga *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              >
                <option value="estagio">🎓 Estágio</option>
                <option value="trainee">👔 Trainee</option>
                <option value="efetivo">💼 Efetivo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Área
              </label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              >
                <option value="">Selecione uma área</option>
                {AREAS.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Localização
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                placeholder="Ex: Brasília - DF"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 mt-8">
                <input
                  type="checkbox"
                  name="isRemote"
                  checked={formData.isRemote}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-500 bg-dark-bg border-dark-border rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-300">Trabalho Remoto</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Faixa Salarial
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="Ex: R$ 800 - R$ 1.200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Requisitos
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="Liste os requisitos da vaga..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Benefícios
            </label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="Liste os benefícios oferecidos..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Link de Inscrição Externa (Opcional)
            </label>
            <input
              type="url"
              name="applicationLink"
              value={formData.applicationLink}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="https://..."
            />
            <p className="mt-2 text-sm text-gray-500">
              Se preenchido, os candidatos poderão se inscrever via este link
            </p>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-4 rounded-xl font-bold hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Publicando...' : 'Publicar Vaga'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/vagas')}
              className="px-6 py-4 border border-dark-border rounded-xl font-semibold text-gray-300 hover:bg-dark-bg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
