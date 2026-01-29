import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../providers/AuthProvider'

export default function Perfil() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'editar' | 'eventos' | 'vagas' | 'salvos'>('editar')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    organization: '',
    website: '',
    area: '',
  })
  const [myEvents, setMyEvents] = useState<any[]>([])
  const [myJobs, setMyJobs] = useState<any[]>([])

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        organization: user.organization || '',
        website: user.website || '',
        area: user.area || '',
      })
      fetchUserContent()
    }
  }, [user])

  const fetchUserContent = async () => {
    try {
      // TODO: Substituir por chamadas reais à API
      // const eventsRes = await fetch(`/api/eventos?userId=${user?.id}`)
      // const jobsRes = await fetch(`/api/vagas?userId=${user?.id}`)
      
      // Mock data por enquanto
      setMyEvents([
        { id: '1', title: 'Seminário de Tecnologia', date: '15/03/2024', views: 1234 },
        { id: '2', title: 'Workshop de IA', date: '22/03/2024', views: 856 },
        { id: '3', title: 'Curso de Gestão', date: '30/03/2024', views: 567 },
      ])
      setMyJobs([
        { id: '1', title: 'Estagiário de TI', company: 'Secretaria de Tecnologia', applications: 24 },
        { id: '2', title: 'Desenvolvedor Júnior', company: 'Secretaria de Tecnologia', applications: 18 },
      ])
    } catch (error) {
      console.error('Erro ao carregar conteúdo:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simular salvamento
    alert('Perfil atualizado com sucesso!')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-bg">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-8 text-center">
            <p className="text-gray-400 mb-4">Você precisa estar logado para ver seu perfil.</p>
            <button
              onClick={() => navigate('/login')}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold"
            >
              Fazer Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  const isPublisher = user?.userType === 'publisher' || user?.userType === 'organizer'

  return (
    <div className="min-h-screen bg-dark-bg pb-20">
      <Navbar />
      
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-purple-800 to-indigo-900 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] opacity-20 mix-blend-overlay bg-cover bg-center" />
         <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10 -mt-20 sm:-mt-24">
         <div className="flex flex-col md:flex-row items-end md:items-end gap-6 mb-8">
            <div className="relative group">
               <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-dark-bg bg-dark-bgSecondary overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-600 bg-gray-800">
                     {user.name?.charAt(0) || 'U'}
                  </div>
                  {/* Se tiver avatar real: <img src={...} className="w-full h-full object-cover" /> */}
               </div>
               <button className="absolute bottom-2 right-2 p-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors shadow-lg border-2 border-dark-bg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
               </button>
            </div>
            
            <div className="flex-1 pb-2">
               <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{user.name || 'Usuário'}</h1>
               <p className="text-purple-400 font-medium mb-1">{user.organization || 'Organização não definida'}</p>
               <p className="text-gray-400 text-sm max-w-2xl">{user.bio || 'Sem biografia definida.'}</p>
            </div>

            <div className="pb-2">
               <button 
                  onClick={handleLogout}
                  className="px-6 py-2 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors text-sm font-bold flex items-center gap-2"
               >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Sair
               </button>
            </div>
         </div>

        {/* Tabs Modernas */}
        <div className="bg-dark-bgSecondary/50 backdrop-blur-md p-1.5 rounded-2xl inline-flex flex-wrap gap-1 border border-white/5 mb-8">
          <button
            onClick={() => setActiveTab('editar')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'editar'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Editar Perfil
          </button>
          <button
            onClick={() => setActiveTab('eventos')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'eventos'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Meus Eventos <span className="ml-1 opacity-60 text-xs bg-black/20 px-1.5 py-0.5 rounded-full">{myEvents.length}</span>
          </button>
          {isPublisher && (
            <button
              onClick={() => setActiveTab('vagas')}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                activeTab === 'vagas'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Minhas Vagas <span className="ml-1 opacity-60 text-xs bg-black/20 px-1.5 py-0.5 rounded-full">{myJobs.length}</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('salvos')}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'salvos'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Salvos
          </button>
        </div>

        {/* Conteúdo das Tabs */}
        <div className="animate-fade-in">
        {activeTab === 'editar' && (
          <div className="bg-dark-bgSecondary border border-dark-border rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
               <div>
                  <h2 className="text-xl font-bold text-white">Informações Pessoais</h2>
                  <p className="text-sm text-gray-500">Atualize seus dados de cadastro.</p>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-xl text-gray-500 cursor-not-allowed"
                  />
                </div>
             </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Bio / Sobre
              </label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Conte um pouco sobre sua trajetória no setor público..."
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Organização
                </label>
                <div className="relative">
                   <span className="absolute left-4 top-3.5 text-gray-500">🏢</span>
                   <input
                     type="text"
                     value={formData.organization}
                     onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                     className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none"
                   />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Área de Atuação
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none"
                >
                  <option value="">Selecione</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Gestão Pública">Gestão Pública</option>
                  <option value="Direito">Direito</option>
                  <option value="Contabilidade">Contabilidade</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Website / LinkedIn
              </label>
              <div className="relative">
                  <span className="absolute left-4 top-3.5 text-gray-500">🌐</span>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://..."
                    className="w-full pl-10 pr-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none"
                  />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-[1.02]"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>
        )}

        {activeTab === 'eventos' && (
          <div className="space-y-4">
            {myEvents.length === 0 ? (
              <div className="bg-dark-bgSecondary border border-dashed border-dark-border rounded-3xl p-16 text-center">
                <div className="text-6xl mb-6 opacity-50">📅</div>
                <h3 className="text-xl font-bold text-white mb-2">Nenhum evento publicado</h3>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">Comece a organizar eventos e compartilhe conhecimento com a comunidade.</p>
                {isPublisher && (
                  <Link
                    to="/eventos/novo"
                    className="inline-block bg-white text-purple-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all"
                  >
                    Criar Evento
                  </Link>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {myEvents.map((event) => (
                <Link
                  key={event.id}
                  to={`/evento/${event.id}`}
                  className="group bg-dark-bgSecondary border border-dark-border rounded-2xl p-6 hover:border-purple-500/50 transition-all hover:bg-dark-bgSecondary/80"
                >
                  <div className="flex justify-between items-start">
                    <div>
                       <div className="text-xs font-bold text-purple-400 mb-1">{event.date}</div>
                       <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{event.title}</h3>
                    </div>
                    <div className="bg-dark-bg p-2 rounded-lg text-center min-w-[60px]">
                      <p className="text-xs text-gray-500">Views</p>
                      <p className="text-lg font-bold text-white">{event.views}</p>
                    </div>
                  </div>
                </Link>
               ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'vagas' && (
          <div className="space-y-4">
            {myJobs.length === 0 ? (
              <div className="bg-dark-bgSecondary border border-dashed border-dark-border rounded-3xl p-16 text-center">
                <div className="text-6xl mb-6 opacity-50">💼</div>
                <h3 className="text-xl font-bold text-white mb-2">Nenhuma vaga publicada</h3>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">Encontre novos talentos para sua equipe divulgando oportunidades.</p>
                <Link
                  to="/vagas/nova"
                  className="inline-block bg-white text-purple-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all"
                >
                  Publicar Vaga
                </Link>
              </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myJobs.map((job) => (
                    <Link
                      key={job.id}
                      to={`/vagas/${job.id}`}
                      className="group bg-dark-bgSecondary border border-dark-border rounded-2xl p-6 hover:border-orange-500/50 transition-all hover:bg-dark-bgSecondary/80"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">{job.title}</h3>
                          <p className="text-gray-400 text-sm">{job.company}</p>
                        </div>
                        <div className="bg-dark-bg p-2 rounded-lg text-center min-w-[60px]">
                          <p className="text-xs text-gray-500">Cands.</p>
                          <p className="text-lg font-bold text-orange-400">{job.applications}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
               </div>
            )}
          </div>
        )}

        {activeTab === 'salvos' && (
          <div className="bg-dark-bgSecondary border border-dashed border-dark-border rounded-3xl p-16 text-center">
            <div className="text-6xl mb-6 opacity-50">⭐</div>
            <p className="text-gray-400 text-lg">Nenhum item salvo ainda</p>
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
