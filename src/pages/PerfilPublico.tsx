import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import SocialFeed from '../components/SocialFeed'
import { GraduationIcon, StarIcon, BriefcaseIcon, MapIcon, GlobeIcon } from '../components/Icons'

interface PublicProfile {
  id: string
  name: string
  role: string
  email: string
  avatar?: string
  bio?: string
  organization?: string
  location?: string
  website?: string
  userType: string
  availableForWork: boolean
  education: { degree: string, area: string, level: string }[]
  skills: string[]
  interests: string[]
}

export default function PerfilPublico() {
  const { id } = useParams<{ id: string }>()
  const [profile, setProfile] = useState<PublicProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
       // Simulate loading
       setTimeout(() => {
          setProfile({
            id: id || '',
            name: 'Ana Paula Rodrigues',
            role: 'Administradora',
            email: 'ana.paula@exemplo.com',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
            bio: 'Profissional com ampla experiência em gestão empresarial, planejamento estratégico e desenvolvimento de projetos. Habilidade em liderança de equipes, análise de mercado e negociação. Em busca de novas vagas.',
            organization: 'Secretaria de Tecnologia',
            location: 'São Paulo, SP',
            website: 'https://exemplo.com',
            userType: 'organizer',
            availableForWork: true,
            education: [
               { degree: 'Administração de Empresas', area: 'Gestão', level: 'Graduação' }
            ],
            skills: ['Auditoria', 'Gestão Pública', 'SAP', 'Planejamento', 'Controle Interno'],
            interests: ['Auditoria Financeira', 'Projetos Internacionais', 'Setor Público', 'Educação', 'Tecnologia']
          })
          setLoading(false)
       }, 500)
    }
  }, [id])

  if (loading) return <div className="min-h-screen bg-dark-bg"><Navbar /><div className="flex justify-center items-center h-[80vh] text-white">Carregando...</div></div>
  if (!profile) return null

  return (
    <div className="min-h-screen bg-[#0f1014] pb-12">
      <Navbar />
      
      {/* Cover Image - Enhanced */}
      <div className="h-48 md:h-64 relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900"></div>
        <img 
            src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop" 
            alt="Cover" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1014] via-transparent to-transparent"></div>
        
        <Link 
          to="/feed" 
          className="absolute top-4 left-4 bg-black/40 hover:bg-black/60 text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md transition-all flex items-center gap-2 border border-white/10 opacity-0 group-hover:opacity-100 sm:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0 duration-300"
        >
          <span>←</span> Voltar para o Feed
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative -mt-24 z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Profile Card (Premium Dark Style) */}
            <div className="lg:col-span-4">
               {/* Card Container - Removed overflow-hidden to allow avatar pop-out */}
               <div className="bg-[#1a1b23]/90 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/10 relative group z-20">
                  {/* Top Gradient Line - Added rounded-t-[2rem] */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-t-[2rem]"></div>
                  
                  <div className="p-8 flex flex-col items-center text-center">
                     {/* Avatar Container - Sticks out of the card */}
                     <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 -mt-20 mb-6 shadow-2xl shadow-purple-900/50 relative z-10">
                        <div className="w-full h-full rounded-full border-4 border-[#1a1b23] overflow-hidden bg-gray-800">
                           {profile.avatar ? (
                              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-gray-700 to-gray-900 text-white">
                                 {profile.name[0]}
                              </div>
                           )}
                        </div>
                        {profile.availableForWork && (
                           <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-[#1a1b23] rounded-full animate-pulse"></div>
                        )}
                     </div>
                     
                     <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{profile.name}</h1>
                     <p className="text-purple-400 font-medium mb-4 flex items-center gap-2 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                        {profile.organization}
                     </p>
                     
                     {profile.availableForWork && (
                        <div className="w-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-400 border border-green-500/20 px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mb-6 shadow-lg shadow-green-900/10">
                           <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                           </span>
                           Disponível para oportunidades
                        </div>
                     )}

                     <p className="text-gray-400 text-sm mb-6 flex items-center gap-2">
                        <MapIcon className="w-4 h-4 text-gray-500" /> {profile.location}
                     </p>
                  </div>

                  {/* Formação */}
                  <div className="px-8 py-6 border-t border-white/5 bg-white/[0.02]">
                     <h3 className="flex items-center gap-2 font-bold text-white mb-4 uppercase text-xs tracking-wider">
                        <GraduationIcon className="w-4 h-4 text-yellow-500" /> Formação
                     </h3>
                     <div className="space-y-4">
                        {profile.education.map((edu, i) => (
                           <div key={i} className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                              <p className="font-bold text-gray-200 text-base">{edu.degree}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                 <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-md text-gray-400 text-xs">{edu.area}</span>
                                 <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-md text-gray-400 text-xs">{edu.level}</span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Competencias */}
                  <div className="px-8 py-6 border-t border-white/5">
                     <h3 className="font-bold text-white mb-4 uppercase text-xs tracking-wider flex items-center gap-2">
                        <StarIcon className="w-4 h-4 text-yellow-400" /> Principais Competências
                     </h3>
                     <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, i) => (
                           <span key={i} className="px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg text-xs font-bold text-gray-300 hover:text-white hover:border-purple-500/50 transition-colors cursor-default">
                              {skill}
                           </span>
                        ))}
                     </div>
                  </div>

                  {/* Resumo */}
                  <div className="px-8 py-6 border-t border-white/5 bg-gradient-to-b from-transparent to-black/20">
                     <h3 className="font-bold text-white mb-3 uppercase text-xs tracking-wider flex items-center gap-2">
                        <BriefcaseIcon className="w-4 h-4 text-orange-400" /> Resumo Profissional
                     </h3>
                     <p className="text-sm text-gray-400 leading-relaxed font-light">
                        {profile.bio}
                     </p>
                  </div>

                  {/* CTA - Added rounded-b-[2rem] */}
                  <div className="p-6 border-t border-white/5 bg-black/20 rounded-b-[2rem]">
                     <button className="w-full bg-white text-black font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:bg-gray-100 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 text-lg">
                        <span className="text-xl">✉️</span> Entrar em Contato
                     </button>
                     <div className="flex justify-center gap-6 mt-6">
                        <button className="text-gray-500 hover:text-white transition-colors hover:scale-110 transform duration-200" title="LinkedIn"><GlobeIcon className="w-6 h-6" /></button>
                        <button className="text-gray-500 hover:text-pink-500 transition-colors hover:scale-110 transform duration-200" title="Instagram"><div className="w-6 h-6 border-2 border-current rounded-lg" /></button> {/* Mock Insta */}
                        <button className="text-gray-500 hover:text-blue-400 transition-colors hover:scale-110 transform duration-200" title="Website"><GlobeIcon className="w-6 h-6" /></button>
                     </div>
                  </div>

               </div>
            </div>

            {/* Right Column: Feed */}
            <div className="lg:col-span-8 space-y-6 pt-0 lg:pt-24">
               {/* Create Post Input */}
               <div className="bg-[#1a1b23] rounded-2xl p-6 shadow-xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex gap-4 relative z-10">
                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex-shrink-0 border border-white/10"></div>
                     <input 
                        type="text" 
                        placeholder={`Escreva algo para ${profile.name}...`}
                        className="flex-1 bg-black/40 border border-white/10 rounded-xl px-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                     />
                  </div>
               </div>

               <div className="flex items-center justify-between px-2 mb-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                     Publicações <span className="text-gray-500 text-lg font-normal">de {profile.name}</span>
                  </h2>
                  <div className="flex gap-2">
                     <button className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg border border-white/5">Most Recent</button>
                  </div>
               </div>
               
               {/* Reuse SocialFeed but filter for this user (mocked) */}
               <SocialFeed />
            </div>

         </div>
      </div>
    </div>
  )
}

