import Navbar from '../components/Navbar'
import { SearchIcon } from '../components/Icons'

const NEWS = [
  {
    id: 1,
    title: 'Governo Lança Novo Portal de Transparência com IA',
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    date: '2h atrás',
    readTime: '5 min de leitura',
    summary: 'Nova plataforma utiliza inteligência artificial para facilitar o acesso e compreensão dos dados públicos pelo cidadão.'
  },
  {
    id: 2,
    title: 'Abertas Inscrições para Hackathon de Inovação Pública',
    category: 'Eventos',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80',
    date: '5h atrás',
    readTime: '3 min de leitura',
    summary: 'Desenvolvedores e designers são convidados a criar soluções para desafios urbanos em maratona de 48 horas.'
  },
  {
    id: 3,
    title: 'Reforma Administrativa: Entenda os Principais Pontos',
    category: 'Legislação',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80',
    date: '1 dia atrás',
    readTime: '10 min de leitura',
    summary: 'Especialistas analisam as propostas de mudança na estrutura das carreiras e serviços públicos.'
  },
  {
    id: 4,
    title: 'Cidades Inteligentes: O Futuro da Gestão Urbana',
    category: 'Inovação',
    image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80',
    date: '2 dias atrás',
    readTime: '7 min de leitura',
    summary: 'Como sensores e big data estão transformando a administração municipal e a qualidade de vida.'
  },
]

export default function Noticias() {
  return (
    <div className="min-h-screen bg-[#0f1014] pb-20 overflow-x-hidden font-sans selection:bg-purple-500/30">
      <Navbar />
      
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px]" />
      </div>
      
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
           <img 
               src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80" 
               alt="Hero" 
               className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-[#0f1014]/50 to-transparent"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full p-8 pb-12">
           <div className="max-w-7xl mx-auto">
              <span className="inline-block px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full mb-4">DESTAQUE</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">
                 Transformação Digital no Setor Público: Um Novo Horizonte
              </h1>
              <div className="flex items-center gap-4 text-gray-300 text-sm">
                 <span>Por Redação ConecteGov</span>
                 <span>•</span>
                 <span>12 Out 2023</span>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Main Content */}
            <div className="flex-1">
               <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white">Últimas Notícias</h2>
                  <div className="flex gap-2">
                     <button className="p-2 text-gray-400 hover:text-white transition-colors"><SearchIcon className="w-5 h-5" /></button>
                  </div>
               </div>
               
               <div className="grid gap-8 relative z-10">
                  {NEWS.map(news => (
                     <div key={news.id} className="group flex flex-col md:flex-row gap-6 bg-[#1a1b23]/60 backdrop-blur-md border border-white/5 p-4 rounded-2xl hover:border-purple-500/30 hover:bg-[#1a1b23]/80 transition-all cursor-pointer">
                        <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden relative flex-shrink-0">
                           <img src={news.image} alt={news.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                           <div className="absolute top-3 left-3">
                              <span className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/10">{news.category}</span>
                           </div>
                        </div>
                        <div className="flex flex-col justify-center flex-1 py-2">
                           <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                              <span className="text-purple-400 font-semibold">{news.date}</span>
                              <span>•</span>
                              <span>{news.readTime}</span>
                           </div>
                           <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors leading-tight">
                              {news.title}
                           </h3>
                           <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                              {news.summary}
                           </p>
                           <span className="text-purple-500 text-sm font-bold group-hover:underline decoration-2 underline-offset-4">Ler matéria completa →</span>
                        </div>
                     </div>
                  ))}
               </div>
               
               <div className="mt-12 text-center">
                  <button className="bg-transparent border border-white/10 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors">
                     Carregar Mais
                  </button>
               </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 space-y-8">
               {/* Newsletter Widget */}
               <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Newsletter</h3>
                  <p className="text-gray-400 text-sm mb-4">Receba as principais atualizações do setor público diretamente no seu email.</p>
                  <input type="email" placeholder="seu@email.com" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white text-sm mb-3 focus:outline-none focus:border-purple-500" />
                  <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors">Inscrever-se</button>
               </div>
               
               {/* Categories */}
               <div>
                  <h3 className="text-lg font-bold text-white mb-4">Categorias</h3>
                  <div className="space-y-2">
                     {['Tecnologia', 'Gestão Pública', 'Legislação', 'Carreira', 'Inovação', 'Eventos'].map(cat => (
                        <div key={cat} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group">
                           <span className="text-gray-400 group-hover:text-white transition-colors">{cat}</span>
                           <span className="text-xs text-gray-600 bg-white/5 px-2 py-1 rounded-md">{(Math.random() * 50 + 10).toFixed(0)}</span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Trending */}
               <div>
                  <h3 className="text-lg font-bold text-white mb-4">Mais Lidas</h3>
                  <div className="space-y-4">
                     {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-4 cursor-pointer group">
                           <span className="text-2xl font-black text-white/10 group-hover:text-purple-500/50 transition-colors">0{i}</span>
                           <p className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">
                              Novas diretrizes para segurança cibernética em órgãos federais são aprovadas
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  )
}
