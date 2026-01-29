import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'
import Preloader from '../components/Preloader'
import PlansModal from '../components/PlansModal'
import { 
   AlertIcon, UserIcon, EditIcon, CheckIcon, ShieldIcon, HeartIcon, ZapIcon,
   BriefcaseIcon, FeedIcon, UsersIcon, GraduationIcon, MapIcon
} from '../components/Icons'

const KeyframeTitle = () => {
    return (
        <div className="overflow-hidden h-[1.3em] relative inline-block align-bottom ml-3">
             <div className="animate-slide-up-fade">
                 <span className="block text-purple-400">Serviço Público</span>
                 <span className="block text-blue-400">Desenvolvimento</span>
                 <span className="block text-green-400">Networking</span>
                 <span className="block text-orange-400">Oportunidade</span>
                 <span className="block text-purple-400">Serviço Público</span>
             </div>
        </div>
    )
}

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true)
  const [showPlans, setShowPlans] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()

  // Intersection Observer for scroll animations
  const observerRef = useRef<IntersectionObserver | null>(null)
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-scale-in')
                entry.target.classList.remove('opacity-0')
            }
        })
    }, { threshold: 0.1 })

    const hiddenElements = document.querySelectorAll('.animate-on-scroll')
    hiddenElements.forEach((el) => observerRef.current?.observe(el))

    return () => observerRef.current?.disconnect()
  }, [showPreloader])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/feed')
    } catch (err) {
      setError('Email ou senha incorretos. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      
      {showPlans && <PlansModal onClose={() => setShowPlans(false)} />}

      <div className="min-h-screen bg-dark-bg font-sans overflow-x-hidden w-full relative">
        
        {/* SECTION 1: HERO - Minimalist & Impactful */}
        <section className="relative min-h-[90vh] flex items-center justify-center border-b border-dark-border/30 bg-[#0f1014]">
             {/* Subtle Background */}
             <div className="absolute inset-0 bg-[#0f1014]">
                 <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent opacity-50"></div>
             </div>

             <div className="relative z-10 max-w-7xl mx-auto px-4 w-full grid lg:grid-cols-2 gap-16 items-center">
                 <div className="text-left animate-slide-right delay-100">
                     <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-300 text-sm font-medium mb-8">
                         ConecteGov 2.0
                     </div>
                     <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                         A Plataforma do <br />
                         <KeyframeTitle />
                     </h1>
                     <p className="text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
                         Conecte-se com servidores de todo o Brasil. Encontre vagas, compartilhe conhecimento e impulsione sua carreira no setor público.
                     </p>
                     
                     <div className="flex flex-wrap gap-4">
                         <button onClick={() => user ? navigate('/feed') : navigate('/cadastro')} className="px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg active:scale-95">
                             Criar Conta Grátis
                         </button>
                         <button onClick={() => setShowPlans(true)} className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/5 transition-all">
                             Ver Planos
                         </button>
                     </div>
                 </div>

                 <div className="relative animate-fade-in delay-300 hidden lg:block">
                     {/* Login Card - Clean Design */}
                     <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-20"></div>
                     <div className="relative bg-dark-bgSecondary border border-dark-border p-8 rounded-2xl shadow-2xl max-w-md mx-auto">
                        {!user ? (
                           <div className="space-y-6">
                               <div className="text-center">
                                   <h3 className="text-2xl font-bold text-white">Acesse sua conta</h3>
                                   <p className="text-gray-400 text-sm">Entre para acessar a rede.</p>
                               </div>
                               {error && (
                                   <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-400 text-sm">
                                       <AlertIcon className="w-4 h-4" /> {error}
                                   </div>
                               )}
                               <form onSubmit={handleLogin} className="space-y-4">
                                   <input 
                                     type="email" 
                                     placeholder="Email funcional" 
                                     className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-purple-500 outline-none transition-colors"
                                     onChange={(e) => setEmail(e.target.value)}
                                   />
                                   <input 
                                     type="password" 
                                     placeholder="Senha" 
                                     className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg text-white focus:border-purple-500 outline-none transition-colors"
                                     onChange={(e) => setPassword(e.target.value)}
                                   />
                                   <button type="submit" disabled={loading} className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-colors">
                                       {loading ? 'Entrando...' : 'Entrar'}
                                   </button>
                               </form>
                               <div className="text-center">
                                   <Link to="/cadastro" className="text-sm text-gray-500 hover:text-white transition-colors">Não tem conta? Cadastre-se</Link>
                               </div>
                           </div>
                        ) : (
                           <div className="text-center py-10 space-y-4">
                               <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto text-3xl">
                                   <CheckIcon className="w-10 h-10" />
                               </div>
                               <h3 className="text-2xl font-bold text-white">Você está logado</h3>
                               <p className="text-gray-400">Bem-vindo de volta, {user.name}</p>
                               <button onClick={() => navigate('/feed')} className="w-full py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition-colors">
                                   Ir para o Feed
                               </button>
                           </div>
                        )}
                     </div>
                 </div>
             </div>
        </section>

        {/* SECTION 2: BENTO GRID - ECOSYSTEM */}
        <section className="py-24 bg-dark-bg relative overflow-hidden">
             {/* Background Elements */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>

             <div className="max-w-7xl mx-auto px-4">
                 <div className="mb-16 text-center max-w-3xl mx-auto opacity-0 animate-on-scroll">
                     <span className="text-purple-400 font-bold tracking-wider uppercase text-sm mb-4 block">O Futuro da Gestão Pública</span>
                     <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Um Ecossistema Completo para o Servidor</h2>
                     <p className="text-gray-400 text-lg">
                         Reunimos todas as ferramentas necessárias para modernizar a administração pública e impulsionar sua carreira em uma única plataforma integrada.
                     </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 opacity-0 animate-on-scroll transition-opacity duration-700 delay-200">
                     
                     {/* Card 1: Main Feature (Large) */}
                     <Link to="/feed" className="md:col-span-2 row-span-2 group relative rounded-3xl overflow-hidden bg-dark-bgSecondary border border-dark-border hover:border-purple-500/50 transition-all duration-500">
                         <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:scale-105 transition-transform duration-700"/>
                         
                         <div className="relative p-10 h-full flex flex-col justify-end">
                             <div className="mb-auto">
                                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mb-6 shadow-xl shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                                     <UsersIcon className="w-8 h-8 text-white" />
                                 </div>
                             </div>
                             
                             <h3 className="text-3xl font-bold text-white mb-4">Comunidade Global & Conectada</h3>
                             <p className="text-gray-400 text-lg mb-8 max-w-lg">
                                 Participe de discussões de alto nível, compartilhe boas práticas e conecte-se com servidores de diferentes esferas e regiões. O networking que transforma a gestão.
                             </p>
                             
                             <div className="flex items-center gap-4">
                                 <div className="flex -space-x-4">
                                     {[1,2,3,4].map(i => (
                                         <div key={i} className="w-10 h-10 rounded-full border-2 border-dark-bg bg-gray-700 flex items-center justify-center text-xs text-white font-bold">
                                             {String.fromCharCode(64+i)}
                                         </div>
                                     ))}
                                 </div>
                                 <span className="text-sm text-gray-400 font-medium">+ 50k servidores conectados</span>
                             </div>
                         </div>
                     </Link>

                     {/* Card 2: Opportunities */}
                     <Link to="/vagas" className="group rounded-3xl bg-dark-bgSecondary border border-dark-border hover:border-green-500/50 p-8 transition-all hover:-translate-y-1 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                             <BriefcaseIcon className="w-24 h-24 text-green-500/5 -rotate-12 transform translate-x-4 -translate-y-4" />
                         </div>
                         <div className="relative z-10">
                             <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-4 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                 <BriefcaseIcon className="w-6 h-6" />
                             </div>
                             <h3 className="text-xl font-bold text-white mb-2">Vagas e Oportunidades</h3>
                             <p className="text-gray-400 text-sm">Encontre estágios, cargos efetivos e posições de liderança.</p>
                         </div>
                     </Link>

                     {/* Card 3: Learning */}
                     <Link to="/cursos" className="group rounded-3xl bg-dark-bgSecondary border border-dark-border hover:border-orange-500/50 p-8 transition-all hover:-translate-y-1 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                             <GraduationIcon className="w-24 h-24 text-orange-500/5 -rotate-12 transform translate-x-4 -translate-y-4" />
                         </div>
                         <div className="relative z-10">
                             <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                 <GraduationIcon className="w-6 h-6" />
                             </div>
                             <h3 className="text-xl font-bold text-white mb-2">Escola de Governo</h3>
                             <p className="text-gray-400 text-sm">Cursos, webinars e materiais para sua evolução profissional.</p>
                         </div>
                     </Link>
                 </div>

                 {/* Bottom Row - Smaller Features */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 opacity-0 animate-on-scroll transition-opacity duration-700 delay-300">
                     <div className="p-6 rounded-2xl bg-dark-bgSecondary border border-dark-border hover:border-blue-500/30 transition-colors text-center group">
                         <FeedIcon className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                         <span className="font-bold text-white block">Feed Interativo</span>
                     </div>
                     <div className="p-6 rounded-2xl bg-dark-bgSecondary border border-dark-border hover:border-pink-500/30 transition-colors text-center group">
                         <HeartIcon className="w-8 h-8 text-pink-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                         <span className="font-bold text-white block">Mentoria</span>
                     </div>
                     <div className="p-6 rounded-2xl bg-dark-bgSecondary border border-dark-border hover:border-yellow-500/30 transition-colors text-center group">
                         <MapIcon className="w-8 h-8 text-yellow-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                         <span className="font-bold text-white block">Mapa de Órgãos</span>
                     </div>
                     <div className="p-6 rounded-2xl bg-dark-bgSecondary border border-dark-border hover:border-cyan-500/30 transition-colors text-center group">
                         <ShieldIcon className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                         <span className="font-bold text-white block">Dados Seguros</span>
                     </div>
                 </div>
             </div>
        </section>

        {/* SECTION 3: USER MODES - Viewer vs Publisher */}
        <section className="py-24 border-y border-dark-border/50 bg-dark-bgSecondary/30">
            <div className="max-w-7xl mx-auto px-4 opacity-0 animate-on-scroll transition-opacity duration-700">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Como você quer atuar?</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">A plataforma se adapta ao se momento de carreira. Escolha seu modo de navegação.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Viewer Card */}
                    <div className="p-8 rounded-3xl bg-dark-bg border border-blue-500/20 hover:border-blue-500/50 transition-all group hover:-translate-y-2">
                         <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                             <UserIcon className="w-8 h-8" />
                         </div>
                         <h3 className="text-2xl font-bold text-white mb-4">Modo Visualizador</h3>
                         <ul className="space-y-3 text-gray-400 mb-8">
                             <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-blue-500" /> Explore vagas e notícias</li>
                             <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-blue-500" /> Consuma conteúdo de qualidade</li>
                             <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-blue-500" /> Acompanhe seus órgãos favoritos</li>
                         </ul>
                         <button className="w-full py-3 rounded-xl border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-colors font-medium">
                             Explorar como Viewer
                         </button>
                    </div>

                    {/* Publisher Card */}
                    <div className="p-8 rounded-3xl bg-dark-bg border border-orange-500/20 hover:border-orange-500/50 transition-all group hover:-translate-y-2">
                         <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 text-orange-400 group-hover:scale-110 transition-transform">
                             <EditIcon className="w-8 h-8" />
                         </div>
                         <h3 className="text-2xl font-bold text-white mb-4">Modo Publicador</h3>
                         <ul className="space-y-3 text-gray-400 mb-8">
                             <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-orange-500" /> Crie postagens e artigos</li>
                             <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-orange-500" /> Divulgue vagas e eventos</li>
                             <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-orange-500" /> Construa sua autoridade</li>
                         </ul>
                         <button className="w-full py-3 rounded-xl border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition-colors font-medium">
                             Começar a Publicar
                         </button>
                    </div>
                </div>
            </div>
        </section>



        {/* SECTION 5: STATS (Minimalist) */}
        <section className="py-20 border-y border-dark-border/30 bg-[#0f1014]">
             <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center opacity-0 animate-on-scroll transition-opacity duration-700">
                 <div>
                     <div className="text-4xl lg:text-5xl font-bold text-white mb-2">50k+</div>
                     <div className="text-gray-500 text-sm uppercase tracking-wider">Servidores</div>
                 </div>
                 <div>
                     <div className="text-4xl lg:text-5xl font-bold text-white mb-2">120+</div>
                     <div className="text-gray-500 text-sm uppercase tracking-wider">Órgãos</div>
                 </div>
                 <div>
                     <div className="text-4xl lg:text-5xl font-bold text-white mb-2">5k+</div>
                     <div className="text-gray-500 text-sm uppercase tracking-wider">Vagas</div>
                 </div>
                 <div>
                     <div className="text-4xl lg:text-5xl font-bold text-white mb-2">4.9</div>
                     <div className="text-gray-500 text-sm uppercase tracking-wider">Avaliação</div>
                 </div>
             </div>
        </section>

        {/* SECTION 6: CTA */}
        <section className="py-32 relative overflow-hidden">
             {/* Gradient Background */}
             <div className="absolute inset-0 bg-gradient-to-b from-dark-bg to-purple-900/20"></div>
             
             <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                 <div className="w-16 h-16 bg-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-purple-600/30 animate-pulse-slow">
                     <ZapIcon className="w-8 h-8 text-white" />
                 </div>
                 <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 tracking-tight">Pronto para transformar sua carreira?</h2>
                 <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                     Junte-se a milhares de servidores que já estão construindo o futuro do setor público.
                 </p>
                 <button 
                    onClick={() => navigate('/cadastro')}
                    className="px-10 py-5 bg-white text-black hover:bg-gray-100 rounded-2xl font-bold text-xl transition-all transform hover:scale-105 shadow-xl"
                 >
                     Fazer Cadastro Gratuito
                 </button>
                 <p className="mt-6 text-sm text-gray-500">
                     Não é necessário cartão de crédito. Acesso básico gratuito para sempre.
                 </p>
             </div>
        </section>

      </div>
      
      {/* Styles for Animations */}
      <style>{`
        .animate-slide-up-fade {
            animation: slideUpFade 10s infinite;
        }
        @keyframes slideUpFade {
            0%, 20% { transform: translateY(0); opacity: 1; }
            20%, 30% { transform: translateY(-100%); opacity: 0; }
            30.1% { transform: translateY(100%); opacity: 0; }
            35%, 55% { transform: translateY(0); opacity: 1; } /* Item 2 */
            55%, 65% { transform: translateY(-100%); opacity: 0; }
            65.1% { transform: translateY(100%); opacity: 0; }
            70%, 90% { transform: translateY(0); opacity: 1; } /* Item 3 */
            90%, 100% { transform: translateY(-100%); opacity: 0; }
        }
        .animate-on-scroll.animate-scale-in {
            animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes scaleIn {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
}
