import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

interface User {
  id: string
  name: string
  avatar: string
  role: string
  organization: string
  location: string
  email?: string
}

const MOCK_USERS: User[] = [
  // Gestores
  {
    id: 'u1',
    name: 'Maria Silva',
    avatar: '👩‍💼',
    role: 'Secretária de Gestão',
    organization: 'Secretaria de Administração',
    location: 'Brasília - DF',
    email: 'maria.silva@admin.gov.br',
  },
  {
    id: 'u2',
    name: 'João Santos',
    avatar: '👨‍💼',
    role: 'Diretor de Planejamento',
    organization: 'Ministério do Planejamento',
    location: 'Brasília - DF',
    email: 'joao.santos@planejamento.gov.br',
  },
  {
    id: 'u3',
    name: 'Ana Costa',
    avatar: '👩‍💼',
    role: 'Coordenadora de Projetos',
    organization: 'Agência de Inovação',
    location: 'São Paulo - SP',
    email: 'ana.costa@inovacao.gov.br',
  },
  
  // Analistas
  {
    id: 'u4',
    name: 'Carlos Oliveira',
    avatar: '👨‍💻',
    role: 'Analista de Sistemas',
    organization: 'Secretaria de Tecnologia',
    location: 'Brasília - DF',
    email: 'carlos.oliveira@tech.gov.br',
  },
  {
    id: 'u5',
    name: 'Patricia Lima',
    avatar: '👩‍💻',
    role: 'Analista de Controle',
    organization: 'Tribunal de Contas',
    location: 'São Paulo - SP',
    email: 'patricia.lima@tcu.gov.br',
  },
  {
    id: 'u6',
    name: 'Roberto Alves',
    avatar: '👨‍💻',
    role: 'Analista de Orçamento',
    organization: 'Ministério da Fazenda',
    location: 'Brasília - DF',
    email: 'roberto.alves@fazenda.gov.br',
  },
  {
    id: 'u7',
    name: 'Fernanda Souza',
    avatar: '👩‍💻',
    role: 'Analista de Licitações',
    organization: 'Secretaria de Compras',
    location: 'Rio de Janeiro - RJ',
    email: 'fernanda.souza@compras.gov.br',
  },
  
  // Estagiários
  {
    id: 'u8',
    name: 'Lucas Martins',
    avatar: '🎓',
    role: 'Estagiário de TI',
    organization: 'Secretaria de Tecnologia',
    location: 'Brasília - DF',
    email: 'lucas.martins@tech.gov.br',
  },
  {
    id: 'u9',
    name: 'Juliana Ferreira',
    avatar: '🎓',
    role: 'Estagiária de Direito',
    organization: 'Procuradoria Geral',
    location: 'Brasília - DF',
    email: 'juliana.ferreira@procuradoria.gov.br',
  },
  {
    id: 'u10',
    name: 'Rafael Costa',
    avatar: '🎓',
    role: 'Estagiário de Comunicação',
    organization: 'Secretaria de Comunicação',
    location: 'São Paulo - SP',
    email: 'rafael.costa@comunicacao.gov.br',
  },
  {
    id: 'u11',
    name: 'Camila Rodrigues',
    avatar: '🎓',
    role: 'Estagiária de Gestão',
    organization: 'Ministério da Administração',
    location: 'Brasília - DF',
    email: 'camila.rodrigues@admin.gov.br',
  },
  
  // Servidores
  {
    id: 'u12',
    name: 'Pedro Henrique',
    avatar: '👨‍⚖️',
    role: 'Servidor Público',
    organization: 'Ministério da Justiça',
    location: 'Brasília - DF',
    email: 'pedro.henrique@justica.gov.br',
  },
  {
    id: 'u13',
    name: 'Beatriz Nunes',
    avatar: '👩‍⚖️',
    role: 'Servidora Pública',
    organization: 'Secretaria de Educação',
    location: 'Rio de Janeiro - RJ',
    email: 'beatriz.nunes@educacao.gov.br',
  },
  {
    id: 'u14',
    name: 'Thiago Silva',
    avatar: '👨‍⚖️',
    role: 'Servidor Público',
    organization: 'Ministério da Saúde',
    location: 'Brasília - DF',
    email: 'thiago.silva@saude.gov.br',
  },
]

const ROLES = ['Gestores', 'Analistas', 'Estagiários', 'Servidores'] as const

type RoleType = typeof ROLES[number]

const roleMapping: Record<RoleType, string[]> = {
  'Gestores': ['Secretária', 'Diretor', 'Coordenadora'],
  'Analistas': ['Analista'],
  'Estagiários': ['Estagiário', 'Estagiária'],
  'Servidores': ['Servidor', 'Servidora'],
}

function getUserRoleCategory(user: User): RoleType {
  for (const [category, keywords] of Object.entries(roleMapping)) {
    if (keywords.some(keyword => user.role.includes(keyword))) {
      return category as RoleType
    }
  }
  return 'Servidores'
}

export default function Governos() {
  const [selectedRole, setSelectedRole] = useState<RoleType | 'Todos'>('Todos')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUsers = MOCK_USERS.filter((user) => {
    const matchesRole = selectedRole === 'Todos' || getUserRoleCategory(user) === selectedRole
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesRole && matchesSearch
  })

  const usersByRole = ROLES.reduce((acc, role) => {
    acc[role] = filteredUsers.filter(user => getUserRoleCategory(user) === role)
    return acc
  }, {} as Record<RoleType, User[]>)

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-4">
            🏛️ Governos
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Conheça os profissionais do setor público
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-6 space-y-4">
          {/* Barra de busca */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nome, cargo, organização ou localização..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-dark-bgSecondary border border-dark-border rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filtros por cargo */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setSelectedRole('Todos')}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                selectedRole === 'Todos'
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white'
                  : 'bg-dark-bgSecondary border border-dark-border text-gray-400 hover:text-white hover:border-purple-500/50'
              }`}
            >
              Todos
            </button>
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                  selectedRole === role
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white'
                    : 'bg-dark-bgSecondary border border-dark-border text-gray-400 hover:text-white hover:border-purple-500/50'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de usuários */}
        {selectedRole === 'Todos' ? (
          <div className="space-y-8">
            {ROLES.map((role) => {
              const users = usersByRole[role]
              if (users.length === 0) return null
              
              return (
                <div key={role} className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl sm:text-3xl">
                      {role === 'Gestores' && '👔'}
                      {role === 'Analistas' && '💼'}
                      {role === 'Estagiários' && '🎓'}
                      {role === 'Servidores' && '👨‍⚖️'}
                    </span>
                    {role} ({users.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {users.map((user) => (
                      <Link
                        key={user.id}
                        to={`/perfil/${user.id}`}
                        className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-5 sm:p-6 hover:border-purple-500/50 transition-all card-hover group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-3xl sm:text-4xl border-2 border-purple-500/30 group-hover:border-purple-500/70 transition-all">
                              {user.avatar}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate group-hover:text-purple-300 transition-colors">
                              {user.name}
                            </h3>
                            <p className="text-purple-300 text-sm sm:text-base font-medium mb-2">
                              {user.role}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm mb-1 truncate">
                              {user.organization}
                            </p>
                            <p className="text-gray-500 text-xs flex items-center gap-1">
                              <span>📍</span>
                              {user.location}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="text-2xl sm:text-3xl">
                {selectedRole === 'Gestores' && '👔'}
                {selectedRole === 'Analistas' && '💼'}
                {selectedRole === 'Estagiários' && '🎓'}
                {selectedRole === 'Servidores' && '👨‍⚖️'}
              </span>
              {selectedRole} ({filteredUsers.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredUsers.map((user) => (
                <Link
                  key={user.id}
                  to={`/perfil/${user.id}`}
                  className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-5 sm:p-6 hover:border-purple-500/50 transition-all card-hover group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-3xl sm:text-4xl border-2 border-purple-500/30 group-hover:border-purple-500/70 transition-all">
                        {user.avatar}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 truncate group-hover:text-purple-300 transition-colors">
                        {user.name}
                      </h3>
                      <p className="text-purple-300 text-sm sm:text-base font-medium mb-2">
                        {user.role}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm mb-1 truncate">
                        {user.organization}
                      </p>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <span>📍</span>
                        {user.location}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">Nenhum usuário encontrado</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedRole('Todos')
              }}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
