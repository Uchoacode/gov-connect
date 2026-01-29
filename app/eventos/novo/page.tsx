'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../providers/AuthProvider'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

const AREAS = [
  'Direito',
  'Contabilidade',
  'Tecnologia',
  'Gestão Pública',
  'Saúde',
  'Educação',
  'Meio Ambiente',
  'Finanças',
  'Recursos Humanos',
  'Auditoria',
]

export default function NovoEventoPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    banner: '',
    location: '',
    date: '',
    time: '',
    organizer: '',
    category: '',
    area: '',
    modality: 'presencial',
    isFree: true,
    price: '',
    registrationLink: '',
    targetAudience: '',
    certification: false,
    program: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Login temporariamente desabilitado para testes
    // if (!loading) {
    //   if (!user) {
    //     router.push('/')
    //   } else if (user.userType !== 'organizer') {
    //     router.push('/feed')
    //   } else {
    //     setFormData(prev => ({ ...prev, organizer: user.name || user.organization || '' }))
    //   }
    // }
    setFormData(prev => ({ ...prev, organizer: 'Organizador Teste' }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const response = await fetch('/api/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          organizerId: 'temp-id',
          userId: 'temp-id',
        }),
      })

      if (response.ok) {
        router.push('/feed')
      } else {
        const data = await response.json()
        setError(data.error || 'Erro ao criar evento')
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

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  // Login temporariamente desabilitado
  // if (!user || user.userType !== 'organizer') return null

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">
          Criar Novo Evento
        </h1>

        <form onSubmit={handleSubmit} className="bg-dark-bgSecondary border border-dark-border rounded-xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Título do Evento *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="Ex: Seminário de Tecnologia Pública"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descrição *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="Descreva seu evento detalhadamente..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Data *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Horário
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Modalidade *
              </label>
              <select
                name="modality"
                value={formData.modality}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              >
                <option value="presencial">📍 Presencial</option>
                <option value="online">🌐 Online</option>
                <option value="hibrido">🔄 Híbrido</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Área Temática
              </label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              >
                <option value="">Selecione uma área</option>
                {AREAS.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isFree"
                  checked={formData.isFree}
                  onChange={(e) => setFormData(prev => ({ ...prev, isFree: e.target.checked, price: e.target.checked ? '' : prev.price }))}
                  className="w-4 h-4 text-purple-500 bg-dark-bg border-dark-border rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-300">Evento Gratuito</span>
              </label>
            </div>

            {!formData.isFree && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preço
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
                  placeholder="Ex: R$ 50,00"
                />
              </div>
            )}

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="certification"
                  checked={formData.certification}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-500 bg-dark-bg border-dark-border rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-300">Oferece Certificado</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Local
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="Ex: Auditório Central, Centro de Convenções"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Link de Inscrição
            </label>
            <input
              type="url"
              name="registrationLink"
              value={formData.registrationLink}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="https://sympla.com.br/evento..."
            />
            <p className="mt-2 text-sm text-gray-500">
              Link externo para inscrições (Sympla, site oficial, Google Forms, etc.)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Organizador *
            </label>
            <input
              type="text"
              name="organizer"
              value={formData.organizer}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Público-Alvo
            </label>
            <input
              type="text"
              name="targetAudience"
              value={formData.targetAudience}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="Ex: Servidores públicos, estudantes, professores..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Programação
            </label>
            <textarea
              name="program"
              value={formData.program}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="Descreva a programação detalhada do evento..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL da Imagem de Banner
            </label>
            <input
              type="url"
              name="banner"
              value={formData.banner}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="https://exemplo.com/banner.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL da Imagem (Thumbnail)
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Criando...' : 'Criar Evento'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/feed')}
              className="px-6 py-3 border border-dark-border rounded-lg font-semibold text-gray-300 hover:bg-dark-bg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
