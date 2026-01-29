import Navbar from '../components/Navbar'

export default function Mapa() {
  const orgs = [
    { name: 'Ministério da Economia', location: 'Brasília - DF', type: 'Federal' },
    { name: 'Secretaria de Tecnologia', location: 'São Paulo - SP', type: 'Estadual' },
    { name: 'Prefeitura Municipal', location: 'Rio de Janeiro - RJ', type: 'Municipal' },
  ]

  return (
    <div className="min-h-screen bg-[#0f1014] overflow-x-hidden font-sans selection:bg-purple-500/30">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">🗺️ Mapa de Órgãos Públicos</h1>

        <div className="bg-[#1a1b23]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 mb-8">
          <div className="h-64 bg-dark-bg rounded-xl flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p>Mapa interativo em desenvolvimento</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {orgs.map((org, i) => (
            <div
              key={i}
              className="bg-[#1a1b23]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-purple-500/50 transition-all card-hover"
            >
              <h3 className="text-xl font-bold text-white mb-2">{org.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>📍 {org.location}</span>
                <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">{org.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
