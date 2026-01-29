import Navbar from '../components/Navbar'

export default function Indicadores() {
  return (
    <div className="min-h-screen bg-[#0f1014] pb-20 overflow-x-hidden font-sans selection:bg-blue-500/30">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
           <div>
              <h1 className="text-4xl font-black text-white mb-2">Indicadores Estratégicos</h1>
              <p className="text-gray-400">Monitoramento de desempenho das políticas públicas.</p>
           </div>
           <div className="flex gap-2 bg-[#1a1b23] p-1 rounded-xl">
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold text-sm shadow-lg">Visão Geral</button>
              <button className="px-4 py-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg font-bold text-sm transition-colors">Detalhado</button>
              <button className="px-4 py-2 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg font-bold text-sm transition-colors">Relatórios</button>
           </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           {[
              { title: 'Índice de Desenvolvimento', val: '0.845', label: 'Alto', color: 'text-green-400' },
              { title: 'Satisfação do Cidadão', val: '78%', label: '+2.4%', color: 'text-purple-400' },
              { title: 'Tempo Médio Atendimento', val: '12min', label: '-5min', color: 'text-blue-400' },
              { title: 'Digitalização Serviços', val: '92%', label: 'Meta Atingida', color: 'text-orange-400' },
           ].map((kpi, i) => (
              <div key={i} className="bg-[#1a1b23]/60 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:border-purple-500/20 transition-all group">
                 <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-2">{kpi.title}</p>
                 <div className="flex items-end justify-between">
                    <span className="text-3xl font-black text-white">{kpi.val}</span>
                    <span className={`text-sm font-bold ${kpi.color} bg-white/5 px-2 py-1 rounded`}>{kpi.label}</span>
                 </div>
                 <div className="w-full h-1 bg-black rounded-full mt-4 overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-gray-700 to-gray-500 group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-500 w-[70%]`}></div>
                 </div>
              </div>
           ))}
        </div>

        {/* Areas Grid */}
        <h2 className="text-xl font-bold text-white mb-6">Desempenho por Setor</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
              { area: 'Saúde', score: 8.5, status: 'Positivo', desc: 'Aumento na cobertura vacinal e redução de filas.' },
              { area: 'Educação', score: 7.2, status: 'Atenção', desc: 'Digitalização de escolas em progresso. Evasão escolar estável.' },
              { area: 'Segurança', score: 6.8, status: 'Crítico', desc: 'Necessidade de investimento em inteligência e monitoramento.' },
              { area: 'Infraestrutura', score: 9.0, status: 'Excelente', desc: 'Obras entregues dentro do prazo. Manutenção viária em dia.' },
              { area: 'Meio Ambiente', score: 7.9, status: 'Estável', desc: 'Metas de reflorestamento atingidas parcialmente.' },
              { area: 'Economia', score: 8.1, status: 'Positivo', desc: 'Arrecadação acima do previsto. Geração de empregos em alta.' },
           ].map((sector, i) => (
              <div key={i} className="bg-[#1a1b23]/60 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors relative">
                 <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white">{sector.area}</h3>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white border-4 ${
                       sector.score >= 8 ? 'border-green-500 bg-green-500/20' : 
                       sector.score >= 7 ? 'border-yellow-500 bg-yellow-500/20' : 
                       'border-red-500 bg-red-500/20'
                    }`}>
                       {sector.score}
                    </div>
                 </div>
                 <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-3 ${
                    sector.status === 'Positivo' || sector.status === 'Excelente' ? 'bg-green-500/10 text-green-400' :
                    sector.status === 'Atenção' || sector.status === 'Estável' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                 }`}>
                    {sector.status}
                 </span>
                 <p className="text-gray-400 text-sm leading-relaxed">{sector.desc}</p>
                 
                 <button className="mt-6 text-purple-400 text-sm font-bold hover:underline">Ver indicadores completos</button>
              </div>
           ))}
        </div>
      </div>
    </div>
  )
}
