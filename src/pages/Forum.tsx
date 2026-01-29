import { useState } from 'react'
import Navbar from '../components/Navbar'

interface Topic {
  id: number
  title: string
  author: string
  replies: number
  views: number
  category: string
  lastActivity: string
  pinned?: boolean
}

export default function Forum() {
  const [topics, setTopics] = useState<Topic[]>([
    { 
      id: 1, 
      title: 'Como funciona o processo seletivo?', 
      author: 'João Silva', 
      replies: 12, 
      views: 234,
      category: 'Dúvidas',
      lastActivity: 'há 2 horas',
      pinned: true,
    },
    { 
      id: 2, 
      title: 'Dicas para concurso público', 
      author: 'Maria Santos', 
      replies: 8, 
      views: 156,
      category: 'Dicas',
      lastActivity: 'há 5 horas',
      pinned: true,
    },
    { 
      id: 3, 
      title: 'Carreira no setor público', 
      author: 'Pedro Costa', 
      replies: 15, 
      views: 289,
      category: 'Carreira',
      lastActivity: 'há 1 dia',
    },
    { 
      id: 4, 
      title: 'Experiências em estágios', 
      author: 'Ana Lima', 
      replies: 23, 
      views: 456,
      category: 'Experiências',
      lastActivity: 'há 2 dias',
    },
    { 
      id: 5, 
      title: 'Preparação para entrevistas', 
      author: 'Carlos Oliveira', 
      replies: 7, 
      views: 189,
      category: 'Dicas',
      lastActivity: 'há 3 dias',
    },
  ])
  const [showNewTopic, setShowNewTopic] = useState(false)
  const [newTopic, setNewTopic] = useState({ title: '', category: '', content: '' })

  const handleNewTopic = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTopic.title && newTopic.category) {
      const topic: Topic = {
        id: topics.length + 1,
        title: newTopic.title,
        author: 'Você',
        replies: 0,
        views: 0,
        category: newTopic.category,
        lastActivity: 'agora',
      }
      setTopics([topic, ...topics])
      setNewTopic({ title: '', category: '', content: '' })
      setShowNewTopic(false)
      alert('Tópico criado com sucesso!')
    }
  }

  const pinnedTopics = topics.filter(t => t.pinned)
  const regularTopics = topics.filter(t => !t.pinned)

  return (
    <div className="min-h-screen bg-[#0f1014] overflow-x-hidden font-sans selection:bg-pink-500/30">
      <Navbar />
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[30%] w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            💬 Fórum de Discussão
          </h1>
          <button 
            onClick={() => setShowNewTopic(!showNewTopic)}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg"
          >
            + Novo Tópico
          </button>
        </div>

        {showNewTopic && (
          <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Criar Novo Tópico</h2>
            <form onSubmit={handleNewTopic} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Título</label>
                <input
                  type="text"
                  required
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Digite o título do tópico..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
                <select
                  required
                  value={newTopic.category}
                  onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Selecione</option>
                  <option value="Dúvidas">Dúvidas</option>
                  <option value="Dicas">Dicas</option>
                  <option value="Carreira">Carreira</option>
                  <option value="Experiências">Experiências</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Conteúdo</label>
                <textarea
                  rows={4}
                  value={newTopic.content}
                  onChange={(e) => setNewTopic({ ...newTopic, content: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Descreva seu tópico..."
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all"
                >
                  Criar Tópico
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewTopic(false)
                    setNewTopic({ title: '', category: '', content: '' })
                  }}
                  className="px-6 py-3 border border-dark-border rounded-xl font-semibold text-gray-300 hover:bg-dark-bg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tópicos Fixados */}
        {pinnedTopics.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              📌 Tópicos Fixados
            </h2>
            <div className="space-y-4">
              {pinnedTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-dark-bgSecondary border border-purple-500/50 rounded-2xl p-5 sm:p-6 hover:border-purple-500 transition-all card-hover"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/30">
                          {topic.category}
                        </span>
                        <span className="text-yellow-400 text-xs">📌</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                        <span>Por {topic.author}</span>
                        <span>💬 {topic.replies} respostas</span>
                        <span>👁️ {topic.views} visualizações</span>
                        <span>{topic.lastActivity}</span>
                      </div>
                    </div>
                    <button className="text-purple-400 hover:text-purple-300 transition-colors px-4 py-2">
                      Ver →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tópicos Regulares */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Tópicos Recentes</h2>
          <div className="space-y-4">
            {regularTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-5 sm:p-6 hover:border-purple-500/50 transition-all card-hover"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/30">
                        {topic.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{topic.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span>Por {topic.author}</span>
                      <span>💬 {topic.replies} respostas</span>
                      <span>👁️ {topic.views} visualizações</span>
                      <span>{topic.lastActivity}</span>
                    </div>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors px-4 py-2">
                    Ver →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
