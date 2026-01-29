import Navbar from '../components/Navbar'
import { SearchIcon } from '../components/Icons'

export default function Transparencia() {
  return (
    <div className="min-h-screen bg-[#0f1014] pb-20 overflow-x-hidden font-sans selection:bg-green-500/30">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[20%] w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
           <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Portal da <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Transparência</span>
           </h1>
           <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Acompanhe em tempo real a aplicação dos recursos públicos. Dados abertos para uma gestão mais eficiente e participativa.
           </p>
           
           <div className="mt-8 max-w-xl mx-auto relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                 type="text" 
                 placeholder="Pesquise por órgão, favorecido ou despesa..." 
                 className="w-full bg-[#1a1b23] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-green-500/50 focus:border-transparent transition-all shadow-lg"
              />
           </div>
        </div>

        {/* Big Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
           <div className="bg-[#1a1b23]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-green-500/30 transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <svg className="w-24 h-24 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.312-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.312.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" /></svg>
              </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Receita Total (2023)</p>
              <p className="text-3xl font-black text-white">R$ 2.4 Bi</p>
              <div className="mt-4 flex items-center text-xs text-green-400 font-bold bg-green-500/10 inline-block px-2 py-1 rounded-md">
                 <span className="mr-1">▲</span> +12% vs ano anterior
              </div>
           </div>
           
           <div className="bg-[#1a1b23]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/30 transition-all">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <svg className="w-24 h-24 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.699-.616a1 1 0 011.286.682l.616 1.699-4.837 1.935L8.798 6.581 6 7.7V13a4 4 0 108 0v-3.118l2 2V13a6 6 0 11-12 0V6a2 2 0 012-2h4V3a1 1 0 011-1zM6.9 8.1L12 6.06v1.98l-5.1 2.04V8.1z" clipRule="evenodd" /></svg>
               </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Despesa Total</p>
              <p className="text-3xl font-black text-white">R$ 1.9 Bi</p>
              <div className="mt-4 flex items-center text-xs text-red-400 font-bold bg-red-500/10 inline-block px-2 py-1 rounded-md">
                 <span className="mr-1">▼</span> -3% abaixo do previsto
              </div>
           </div>

           <div className="bg-[#1a1b23]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <svg className="w-24 h-24 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
               </div>
              <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-2">Contratos Ativos</p>
              <p className="text-3xl font-black text-white">1,245</p>
              <div className="mt-4 flex items-center text-xs text-blue-400 font-bold bg-blue-500/10 inline-block px-2 py-1 rounded-md">
                 <span className="mr-1">●</span> 98% de conformidade
              </div>
           </div>
        </div>

        {/* Charts Section (Mock) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#1a1b23] border border-white/5 rounded-2xl p-6">
               <h3 className="text-white font-bold mb-6">Execução Orçamentária por Área</h3>
               <div className="space-y-4">
                  {[
                     { label: 'Saúde', val: 85, color: 'bg-green-500' },
                     { label: 'Educação', val: 72, color: 'bg-blue-500' },
                     { label: 'Segurança', val: 64, color: 'bg-red-500' },
                     { label: 'Infraestrutura', val: 45, color: 'bg-yellow-500' },
                     { label: 'Tecnologia', val: 92, color: 'bg-purple-500' },
                  ].map((item, i) => (
                     <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                           <span className="text-gray-300">{item.label}</span>
                           <span className="text-white font-bold">{item.val}%</span>
                        </div>
                        <div className="w-full h-2 bg-black rounded-full overflow-hidden">
                           <div className={`h-full ${item.color} rounded-full`} style={{width: `${item.val}%`}}></div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="bg-[#1a1b23] border border-white/5 rounded-2xl p-6 flex flex-col justify-center items-center">
               <h3 className="text-white font-bold mb-6 w-full text-left">Distribuição de Recursos</h3>
               {/* CSS Pie Chart Mock */}
               <div className="w-48 h-48 rounded-full border-8 border-[#2a2b36] relative flex items-center justify-center mb-4">
                  <div className="absolute inset-0 rounded-full border-8 border-purple-500 border-t-transparent border-r-transparent transform rotate-45"></div>
                  <div className="text-center">
                     <span className="block text-2xl font-bold text-white">100%</span>
                     <span className="text-xs text-gray-500 uppercase">Auditado</span>
                  </div>
               </div>
               <div className="flex gap-4 text-xs">
                  <span className="flex items-center gap-2 text-gray-400"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Federal</span>
                  <span className="flex items-center gap-2 text-gray-400"><span className="w-2 h-2 rounded-full bg-[#2a2b36]"></span> Estadual/Municipal</span>
               </div>
            </div>
        </div>

        {/* Recent Contracts Table */}
        <div className="bg-[#1a1b23] border border-white/5 rounded-2xl overflow-hidden">
           <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-bold text-white">Últimos Contratos e Licitações</h3>
              <button className="text-sm text-green-400 font-bold hover:text-green-300">Ver Todos</button>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-black/20 text-gray-400 text-xs uppercase">
                       <th className="p-4 font-bold border-b border-white/5">Data</th>
                       <th className="p-4 font-bold border-b border-white/5">Órgão</th>
                       <th className="p-4 font-bold border-b border-white/5">Objeto</th>
                       <th className="p-4 font-bold border-b border-white/5">Valor</th>
                       <th className="p-4 font-bold border-b border-white/5">Status</th>
                    </tr>
                 </thead>
                 <tbody className="text-sm">
                    {[
                       { date: '12/10/2023', org: 'Min. Saúde', obj: 'Aquisição de Medicamentos', val: 'R$ 450.000,00', status: 'Concluído' },
                       { date: '11/10/2023', org: 'Sec. Educação', obj: 'Reforma de Escolas', val: 'R$ 2.100.000,00', status: 'Em Análise' },
                       { date: '10/10/2023', org: 'Metrô DF', obj: 'Manutenção Preventiva', val: 'R$ 890.000,00', status: 'Aberto' },
                       { date: '09/10/2023', org: 'Agência TI', obj: 'Licenças de Software', val: 'R$ 1.500.000,00', status: 'Concluído' },
                    ].map((row, i) => (
                       <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-gray-300">{row.date}</td>
                          <td className="p-4 text-white font-medium">{row.org}</td>
                          <td className="p-4 text-gray-400">{row.obj}</td>
                          <td className="p-4 text-white font-bold">{row.val}</td>
                          <td className="p-4">
                             <span className={`px-2 py-1 rounded text-xs font-bold border ${
                                row.status === 'Concluído' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 
                                row.status === 'Em Análise' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400' : 
                                'bg-blue-500/10 border-blue-500/30 text-blue-400'
                             }`}>{row.status}</span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  )
}
