import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ApplicationModal from '../components/ApplicationModal'
import { SearchIcon } from '../components/Icons'

interface Job {
  id: string
  title: string
  description?: string
  company: string
  location?: string
  type?: string
  area?: string
  salary?: string
  isRemote?: boolean
  createdAt: string
  views?: number
  applications?: number
}

export default function Vagas() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showApplication, setShowApplication] = useState(false)
  const [filter, setFilter] = useState({
    area: '',
    type: '',
    location: '',
    remote: '',
    search: '',
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      // Muitas vagas fake para demonstrar
      const mockJobs: Job[] = [
        {
          id: 'job1',
          title: 'Estagiário de Tecnologia',
          description: 'Oportunidade para estudante de TI trabalhar com desenvolvimento de sistemas para o setor público. Requisitos: cursando ensino superior em TI, conhecimento em programação (JavaScript, Python ou Java), interesse em inovação pública.',
          company: 'Secretaria de Tecnologia',
          location: 'Brasília - DF',
          area: 'Tecnologia',
          type: 'estagio',
          salary: 'R$ 800 - R$ 1.200',
          isRemote: false,
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          views: 234,
          applications: 12,
        },
        {
          id: 'job2',
          title: 'Estagiário de Gestão Pública',
          description: 'Venha fazer parte da equipe de gestão pública! Trabalhe com projetos importantes e desenvolva habilidades em administração pública, planejamento estratégico e políticas públicas.',
          company: 'Ministério da Administração',
          location: 'Remoto',
          area: 'Gestão Pública',
          type: 'estagio',
          salary: 'R$ 900 - R$ 1.300',
          isRemote: true,
          createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
          views: 189,
          applications: 8,
        },
        {
          id: 'job3',
          title: 'Analista de Controle Interno',
          description: 'Vaga para analista com experiência em auditoria e controle interno. Responsável por análise de processos, elaboração de relatórios e acompanhamento de conformidade.',
          company: 'Tribunal de Contas',
          location: 'São Paulo - SP',
          area: 'Auditoria',
          type: 'efetivo',
          salary: 'R$ 4.500 - R$ 6.000',
          isRemote: false,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          views: 456,
          applications: 45,
        },
        {
          id: 'job4',
          title: 'Desenvolvedor Full Stack',
          description: 'Desenvolvedor para trabalhar em projetos de transformação digital do setor público. Stack: React, Node.js, TypeScript, PostgreSQL. Experiência com APIs REST e microserviços.',
          company: 'Agência de Inovação',
          location: 'Remoto',
          area: 'Tecnologia',
          type: 'efetivo',
          salary: 'R$ 6.000 - R$ 9.000',
          isRemote: true,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          views: 678,
          applications: 67,
        },
        {
          id: 'job5',
          title: 'Trainee em Direito Público',
          description: 'Programa de trainee para recém-formados em Direito interessados em direito público, administrativo e constitucional. Rotação por diferentes áreas jurídicas.',
          company: 'Advocacia-Geral da União',
          location: 'Brasília - DF',
          area: 'Direito',
          type: 'trainee',
          salary: 'R$ 2.500 - R$ 3.500',
          isRemote: false,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          views: 523,
          applications: 89,
        },
        {
          id: 'job6',
          title: 'Contador Público',
          description: 'Contador para atuar na área contábil e fiscal do setor público. Responsável por contabilização, elaboração de balanços e cumprimento de obrigações fiscais.',
          company: 'Secretaria de Fazenda',
          location: 'Rio de Janeiro - RJ',
          area: 'Contabilidade',
          type: 'efetivo',
          salary: 'R$ 5.000 - R$ 7.000',
          isRemote: false,
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          views: 345,
          applications: 23,
        },
        {
          id: 'job7',
          title: 'Estagiário de Comunicação',
          description: 'Estágio em comunicação pública, produção de conteúdo para redes sociais, assessoria de imprensa e eventos institucionais.',
          company: 'Secretaria de Comunicação',
          location: 'Belo Horizonte - MG',
          area: 'Comunicação',
          type: 'estagio',
          salary: 'R$ 700 - R$ 1.000',
          isRemote: false,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          views: 267,
          applications: 34,
        },
        {
          id: 'job8',
          title: 'Analista de Dados',
          description: 'Analista para trabalhar com análise de dados públicos, criação de dashboards, relatórios e visualizações. Conhecimento em Python, SQL e Power BI.',
          company: 'Instituto de Pesquisa',
          location: 'Remoto',
          area: 'Tecnologia',
          type: 'efetivo',
          salary: 'R$ 5.500 - R$ 8.000',
          isRemote: true,
          createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          views: 412,
          applications: 56,
        },
        {
          id: 'job9',
          title: 'Estagiário de Recursos Humanos',
          description: 'Estágio em RH público, auxiliando em processos seletivos, gestão de pessoas, desenvolvimento organizacional e políticas de carreira.',
          company: 'Departamento de RH',
          location: 'Curitiba - PR',
          area: 'Recursos Humanos',
          type: 'estagio',
          salary: 'R$ 800 - R$ 1.100',
          isRemote: false,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          views: 198,
          applications: 15,
        },
        {
          id: 'job10',
          title: 'Arquiteto de Software',
          description: 'Arquiteto para liderar projetos de software no setor público, definição de arquiteturas, padrões de desenvolvimento e mentoria de equipes técnicas.',
          company: 'Agência de Tecnologia',
          location: 'Remoto',
          area: 'Tecnologia',
          type: 'efetivo',
          salary: 'R$ 10.000 - R$ 15.000',
          isRemote: true,
          createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          views: 789,
          applications: 45,
        },
      ]
      setJobs(mockJobs)
    } catch (error) {
      console.error('Erro ao carregar vagas:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredJobs = jobs.filter(job => {
    if (filter.area && job.area !== filter.area) return false
    if (filter.type && job.type !== filter.type) return false
    if (filter.location && !job.location?.toLowerCase().includes(filter.location.toLowerCase())) return false
    if (filter.remote === 'sim' && !job.isRemote) return false
    if (filter.remote === 'nao' && job.isRemote) return false
    if (filter.search && !job.title.toLowerCase().includes(filter.search.toLowerCase()) && !job.company.toLowerCase().includes(filter.search.toLowerCase())) return false
    return true
  })

  const handleApply = (job: Job) => {
    setSelectedJob(job)
    setShowApplication(true)
  }

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      {/* Header Splash */}
      <div className="relative bg-gradient-to-r from-purple-900/40 to-dark-bg border-b border-dark-border py-12 mb-8 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] opacity-5 mix-blend-overlay bg-cover bg-center" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6">
               <div className="animate-slide-right">
                  <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
                     Oportunidades Públicas
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                     Encontre sua próxima <br />
                     <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">Missão no Governo</span>
                  </h1>
                  <p className="text-gray-400 text-lg max-w-xl">
                     Vagas de estágio, trainee e efetivas em órgãos de todo o país. Conecte-se com o futuro da gestão pública.
                  </p>
               </div>
               <Link
                  to="/vagas/nova"
                  className="bg-white text-purple-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-scale-in"
               >
                  + Publicar Vaga
               </Link>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
           
           {/* Sidebar Filters */}
           <div className="w-full lg:w-72 flex-shrink-0 space-y-8">
              <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-6 sticky top-24">
                 <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-white text-lg">Filtros</h3>
                    {(filter.area || filter.type || filter.location || filter.remote) && (
                       <button onClick={() => setFilter({ area: '', type: '', location: '', remote: '', search: '' })} className="text-xs text-purple-400 hover:underline">Limpar</button>
                    )}
                 </div>

                 {/* Busca Rápida */}
                 <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Buscar</label>
                    <div className="relative">
                       <SearchIcon className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                       <input 
                          type="text" 
                          placeholder="Cargo ou órgão..." 
                          value={filter.search}
                          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                          className="w-full pl-9 pr-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                       />
                    </div>
                 </div>

                 {/* Filtro: Área */}
                 <div className="mb-6">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Área de Atuação</label>
                    <select
                       value={filter.area}
                       onChange={(e) => setFilter({ ...filter, area: e.target.value })}
                       className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    >
                       <option value="">Todas as áreas</option>
                       <option value="Tecnologia">Tecnologia</option>
                       <option value="Gestão Pública">Gestão Pública</option>
                       <option value="Auditoria">Auditoria</option>
                       <option value="Direito">Direito</option>
                       <option value="Contabilidade">Contabilidade</option>
                       <option value="Comunicação">Comunicação</option>
                       <option value="Recursos Humanos">Recursos Humanos</option>
                    </select>
                 </div>

                 {/* Filtro: Tipo */}
                 <div className="mb-6">
                     <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Tipo de Vaga</label>
                     <div className="space-y-2">
                        {['', 'estagio'].map((t) => (
                           <label key={t} className="flex items-center gap-2 cursor-pointer group">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                 filter.type === t ? 'bg-purple-500 border-purple-500' : 'border-gray-600 group-hover:border-gray-500'
                              }`}>
                                 {filter.type === t && <div className="w-2 h-2 bg-white rounded-sm" />}
                              </div>
                              <input type="radio" name="type" className="hidden" checked={filter.type === t} onChange={() => setFilter({...filter, type: t})} />
                              <span className={`text-sm ${filter.type === t ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'}`}>
                                 {t === '' ? 'Todos' : t.charAt(0).toUpperCase() + t.slice(1)}
                              </span>
                           </label>
                        ))}
                     </div>
                 </div>
              </div>
              
              {/* Banner Lateral */}
              <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/20 rounded-2xl p-6 text-center">
                 <h4 className="text-white font-bold mb-2">Prepare-se para aprovação</h4>
                 <p className="text-gray-400 text-xs mb-4">Acesse cursos gratuitos para melhorar seu currículo.</p>
                 <Link to="/cursos" className="inline-block px-4 py-2 bg-orange-500/20 text-orange-400 text-sm font-bold rounded-lg hover:bg-orange-500/30 transition-colors">
                    Ver Cursos
                 </Link>
              </div>
           </div>

           {/* Main Grid */}
           <div className="flex-1">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                     <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                     <p className="text-gray-400">Buscando oportunidades...</p>
                  </div>
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-12 text-center animate-fade-in">
                  <div className="w-20 h-20 bg-dark-bg rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">💼</div>
                  <h3 className="text-xl font-bold text-white mb-2">Nenhuma vaga encontrada</h3>
                  <p className="text-gray-400 mb-6">Tente ajustar seus filtros ou busque por outros termos.</p>
                  <button
                    onClick={() => setFilter({ area: '', type: '', location: '', remote: '', search: '' })}
                    className="text-purple-400 font-bold hover:text-purple-300 transition-colors"
                  >
                    Limpar todos os filtros
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6 flex items-center justify-between">
                     <p className="text-gray-400 text-sm">
                        Total de <strong>{filteredJobs.length}</strong> vagas encontradas
                     </p>
                     <div className="flex items-center gap-2 text-sm text-gray-500">
                        Ordenar por: <span className="text-white font-medium cursor-pointer">Mais recentes</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {filteredJobs.map((job, index) => (
                        <div
                           key={job.id}
                           className="group bg-dark-bgSecondary border border-dark-border rounded-2xl p-5 hover:border-purple-500/50 hover:bg-dark-bgSecondary/80 transition-all duration-300 flex flex-col relative overflow-hidden animate-slide-up"
                           style={{ animationDelay: `${index * 50}ms` }}
                        >
                           <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-2xl">↗</span>
                           </div>

                           <div className="mb-4">
                              <div className="flex items-start justify-between mb-3">
                                 <div className="flex items-center gap-2">
                                     <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                                        🏛️
                                     </div>
                                     <div>
                                        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{job.company}</p>
                                        <p className="text-xs text-gray-500">{job.location} {job.isRemote && '• Remoto'}</p>
                                     </div>
                                 </div>
                                 {job.type && (
                                    <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold border ${
                                       job.type === 'estagio' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                       job.type === 'trainee' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
                                       'bg-green-500/10 text-green-400 border-green-500/20'
                                    }`}>
                                       {job.type}
                                    </span>
                                 )}
                              </div>
                              
                              <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-purple-400 transition-colors">{job.title}</h3>
                              <p className="text-sm text-gray-400 line-clamp-2 mb-4">{job.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                 {job.salary && (
                                    <span className="text-xs font-semibold text-green-400 bg-green-900/20 px-2 py-1 rounded">
                                       💰 {job.salary}
                                    </span>
                                 )}
                                 {job.area && (
                                    <span className="text-xs font-semibold text-gray-300 bg-white/5 px-2 py-1 rounded">
                                       {job.area}
                                    </span>
                                 )}
                              </div>
                           </div>

                           <div className="mt-auto pt-4 border-t border-dark-border flex items-center justify-between">
                              <span className="text-xs text-gray-500">Publicado há {Math.floor(Math.random() * 5) + 1} dias</span>
                              <button 
                                 onClick={() => handleApply(job)}
                                 className="text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors shadow-lg shadow-purple-900/20"
                              >
                                 Candidatar-se
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
                </>
              )}
           </div>
        </div>
      </div>

      {showApplication && selectedJob && (
        <ApplicationModal
          jobId={selectedJob.id}
          jobTitle={selectedJob.title}
          company={selectedJob.company}
          onClose={() => {
            setShowApplication(false)
            setSelectedJob(null)
          }}
        />
      )}
    </div>
  )
}
