import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../providers/AuthProvider'

export default function NovaVaga() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    type: 'estagio',
    area: '',
    salary: '',
    isRemote: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      // Validação
      if (!formData.title || !formData.company || !formData.description) {
        setError('Preencha todos os campos obrigatórios')
        setSubmitting(false)
        return
      }

      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 1000))

      alert('Vaga publicada com sucesso!')
      navigate('/vagas')
    } catch (error) {
      setError('Erro ao publicar vaga. Tente novamente.')
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">📝 Publicar Nova Vaga</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6 text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-6 md:p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Título da Vaga *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Estagiário de Tecnologia"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Empresa/Órgão *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Ex: Secretaria de Tecnologia"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Descrição *
              </label>
              <textarea
                required
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva a vaga, requisitos, responsabilidades..."
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tipo de Vaga *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="estagio">Estágio</option>
                  <option value="trainee">Trainee</option>
                  <option value="efetivo">Efetivo</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Área
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Gestão Pública">Gestão Pública</option>
                  <option value="Auditoria">Auditoria</option>
                  <option value="Direito">Direito</option>
                  <option value="Contabilidade">Contabilidade</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Educação">Educação</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Localização
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Ex: Brasília - DF"
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  disabled={formData.isRemote}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Remuneração
                </label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="Ex: R$ 800 - R$ 1.200"
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isRemote"
                checked={formData.isRemote}
                onChange={(e) => setFormData({ ...formData, isRemote: e.target.checked, location: e.target.checked ? 'Remoto' : '' })}
                className="w-5 h-5 rounded bg-dark-bg border-dark-border text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="isRemote" className="text-gray-300">
                Vaga remota
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all disabled:opacity-50"
              >
                {submitting ? 'Publicando...' : 'Publicar Vaga'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/vagas')}
                className="px-6 py-3 border border-dark-border rounded-xl font-semibold text-gray-300 hover:bg-dark-bg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
