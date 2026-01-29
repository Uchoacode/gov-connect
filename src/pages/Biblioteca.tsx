import Navbar from '../components/Navbar'
import { SearchIcon } from '../components/Icons'

const BOOKS = [
  { id: 1, title: 'Manual de Direito Administrativo Moderno', type: 'Manual', author: 'Dr. Silva', year: 2023 },
  { id: 2, title: 'Inovação no Setor Público: Guia Prático', type: 'E-book', author: 'GovLab', year: 2022 },
  { id: 3, title: 'Constituição Federal Comentada', type: 'Legislação', author: 'STF', year: 1988 },
  { id: 4, title: 'Gestão de Pessoas no Setor Público', type: 'Artigo', author: 'Prof. Ana', year: 2023 },
  { id: 5, title: 'Orçamento Público Explicado', type: 'Guia', author: 'Tesouro', year: 2021 },
  { id: 6, title: 'Transformação Digital em Governos', type: 'E-book', author: 'D. Techn.', year: 2024 },
]

export default function Biblioteca() {
  return (
    <div className="min-h-screen bg-[#0f1014] pb-20 overflow-x-hidden font-sans selection:bg-cyan-500/30">
      <Navbar />
            
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>
      
      {/* Header */}
      <div className="bg-[#1a1b23] border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h1 className="text-4xl font-bold text-white mb-4">Biblioteca Digital</h1>
           <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              O maior acervo de conhecimento público. Acesse manuais, legislações, artigos acadêmicos e e-books gratuitos.
           </p>
           
           <div className="max-w-xl mx-auto relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input 
                 type="text" 
                 placeholder="Busque por título, autor ou tema..." 
                 className="w-full bg-black/30 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all"
              />
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
         {/* Categories */}
         <div className="flex overflow-x-auto gap-4 pb-8 no-scrollbar">
            {['Todos', 'Legislação', 'Manuais', 'E-books', 'Artigos Científicos', 'Relatórios', 'Modelos'].map((cat, i) => (
               <button 
                  key={cat}
                  className={`px-6 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-all ${i === 0 ? 'bg-white text-black' : 'bg-[#1a1b23] text-gray-400 border border-white/10 hover:border-white/30 hover:text-white'}`}
               >
                  {cat}
               </button>
            ))}
         </div>

         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {BOOKS.map(book => (
               <div key={book.id} className="group cursor-pointer">
                  <div className="aspect-[2/3] bg-[#1a1b23] border border-white/5 rounded-xl overflow-hidden relative mb-4 shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
                     {/* Placeholder Book Cover */}
                     <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center p-4 text-center">
                        <span className="font-serif text-gray-500 opacity-20 text-6xl italic">Aa</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                           <span className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">{book.type}</span>
                           <h3 className="text-white font-bold leading-tight line-clamp-3">{book.title}</h3>
                        </div>
                     </div>
                     
                     <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-sm shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                           Ler Agora
                        </button>
                     </div>
                  </div>
                  
                  <div>
                     <h4 className="text-white font-medium text-sm line-clamp-1 group-hover:text-purple-400 transition-colors">{book.title}</h4>
                     <p className="text-gray-500 text-xs mt-1">{book.author} • {book.year}</p>
                  </div>
               </div>
            ))}
            
            {/* Mocking more items to fill grid */}
            {[...Array(9)].map((_, i) => (
               <div key={i+10} className="group cursor-pointer">
                  <div className="aspect-[2/3] bg-[#1a1b23] border border-white/5 rounded-xl overflow-hidden relative mb-4 shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
                     <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center p-4 text-center">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                           <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Documento</span>
                           <h3 className="text-white font-bold leading-tight line-clamp-3">Documento Público #{i+1}</h3>
                        </div>
                     </div>
                  </div>
                  <div>
                     <h4 className="text-white font-medium text-sm line-clamp-1 group-hover:text-purple-400 transition-colors">Documento Público #{i+1}</h4>
                     <p className="text-gray-500 text-xs mt-1">Autor Desconhecido • 2023</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  )
}
