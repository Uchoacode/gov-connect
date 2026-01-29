import Navbar from '../components/Navbar'

export default function Cursos() {
  return (
    <div className="min-h-screen bg-[#0f1014] pb-20 overflow-x-hidden font-sans selection:bg-purple-500/30">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>
      
      {/* Platform Header */}
      <div className="bg-gradient-to-r from-purple-900/20 via-[#0f1014] to-[#0f1014] border-b border-white/5 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-center md:text-left">
              <span className="text-purple-400 font-bold tracking-wider text-xs uppercase mb-2 block">Universidade Corporativa</span>
              <h1 className="text-4xl font-black text-white mb-4">Gov<span className="text-purple-400">Academy</span></h1>
              <p className="text-gray-400 max-w-lg">
                 Capacitação contínua para servidores públicos. Desenvolva novas habilidades e impulsione sua carreira no setor público.
              </p>
           </div>
           
           <div className="flex gap-6 text-center">
              <div className="bg-[#1a1b23] border border-white/10 p-4 rounded-2xl min-w-[120px]">
                 <span className="block text-3xl font-bold text-white mb-1">12</span>
                 <span className="text-xs text-gray-500 uppercase font-bold">Cursos Concluídos</span>
              </div>
              <div className="bg-[#1a1b23] border border-white/10 p-4 rounded-2xl min-w-[120px]">
                 <span className="block text-3xl font-bold text-white mb-1">45h</span>
                 <span className="text-xs text-gray-500 uppercase font-bold">Horas Estudadas</span>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 relative z-10">
         
         {/* Continuar Assistindo */}
         <div>
            <h2 className="text-xl font-bold text-white mb-6">Continuar Estudando</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1, 2].map(i => (
                  <div key={i} className="bg-[#1a1b23] border border-white/5 rounded-2xl p-4 hover:border-purple-500/30 transition-all group">
                     <div className="flex gap-4 mb-4">
                        <div className="w-20 h-20 bg-gray-800 rounded-xl flex-shrink-0 bg-cover bg-center" style={{backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80')`}}></div>
                        <div>
                           <span className="text-purple-400 text-xs font-bold uppercase mb-1 block">Em andamento</span>
                           <h3 className="text-white font-bold leading-tight mb-2">Gestão Ágil no Setor Público</h3>
                           <p className="text-gray-500 text-xs">Módulo 3 de 8 • 45% concluído</p>
                        </div>
                     </div>
                     <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[45%]"></div>
                     </div>
                     <button className="mt-4 w-full py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-lg transition-colors">
                        Continuar Aula
                     </button>
                  </div>
               ))}
            </div>
         </div>

         {/* Trilhas de Aprendizagem */}
         <div>
            <div className="flex justify-between items-end mb-6">
               <h2 className="text-xl font-bold text-white">Cursos Populares</h2>
               <button className="text-purple-400 text-sm font-bold hover:text-purple-300">Ver catálogo completo</button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                  { title: 'Lei de Proteção de Dados (LGPD)', category: 'Jurídico', hours: '20h', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b' },
                  { title: 'Liderança e Gestão de Equipes', category: 'Soft Skills', hours: '15h', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c' },
                  { title: 'Contratações Públicas e Licitações', category: 'Administrativo', hours: '40h', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40' },
                  { title: 'Excel Avançado para Gestores', category: 'Ferramentas', hours: '12h', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71' },
               ].map((course, i) => (
                  <div key={i} className="bg-[#1a1b23] border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
                     <div className="h-48 bg-gray-800 relative bg-cover bg-center" style={{backgroundImage: `url('${course.img}?auto=format&fit=crop&q=80')`}}>
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                        <div className="absolute top-3 left-3">
                           <span className="bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md border border-white/10">{course.category}</span>
                        </div>
                     </div>
                     <div className="p-5">
                        <h3 className="text-white font-bold mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">{course.title}</h3>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                           <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                              {course.hours}
                           </span>
                           <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                              3.2k alunos
                           </span>
                        </div>
                        <button className="w-full py-2.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                           Inscrever-se
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         </div>
         
         {/* Banner */}
         <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Certificação Avançada em Gestão</h2>
                  <p className="text-purple-100 max-w-lg">
                     Torne-se um especialista em gestão pública com nossa nova trilha de certificação reconhecida internacionalmente.
                  </p>
               </div>
               <button className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg whitespace-nowrap">
                  Saiba Mais
               </button>
            </div>
         </div>

      </div>
    </div>
  )
}
