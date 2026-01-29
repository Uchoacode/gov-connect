import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { 
  BarChartIcon, BriefcaseIcon, ClipboardIcon, EyeIcon, 
  MapIcon, BookIcon, ChatIcon, ShieldIcon, StarIcon, 
  GlobeIcon, CalendarIcon, HeartIcon, ZapIcon, LightBulbIcon
} from '../components/Icons'

// Icons for new features
const GovWalletIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
const EduGovIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>
const MarketplaceIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
const MentorIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
const InnovationIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
const PollIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
const HealthIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
const NewsIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
const GavelIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>

interface Stat {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: React.ReactNode
  color: string
}

export default function Painel() {
  const [stats, setStats] = useState<Stat[]>([])

  useEffect(() => {
    setStats([
      { title: 'Visualizações do Perfil', value: '2.4k', change: '+12%', isPositive: true, icon: <EyeIcon className="w-6 h-6" />, color: 'purple' },
      { title: 'Conexões', value: '156', change: '+5%', isPositive: true, icon: <GlobeIcon className="w-6 h-6" />, color: 'blue' },
      { title: 'Reputação', value: '98/100', change: '+2%', isPositive: true, icon: <StarIcon className="w-6 h-6" />, color: 'yellow' },
      { title: 'Projetos', value: '12', change: '0%', isPositive: true, icon: <BriefcaseIcon className="w-6 h-6" />, color: 'emerald' },
    ])
  }, [])

  return (
    <div className="min-h-screen bg-[#0f1014] text-white font-sans selection:bg-purple-500/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Painel de Controle
            </h1>
            <p className="text-gray-400 mt-1">Bem-vindo de volta, Gestor.</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-dark-bgSecondary border border-dark-border hover:border-purple-500/50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
              Exportar Dados
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-purple-900/20 transition-all transform hover:scale-105">
              + Novo Relatório
            </button>
          </div>
        </div>

        {/* KPI Grid - Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="group relative bg-[#1a1b23] border border-white/5 p-6 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
               <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-${stat.color}-500 transform group-hover:scale-110 duration-500`}>
                  {/* Large BG Icon */}
                  {stat.icon}
               </div>
               
               <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:text-${stat.color}-300 transition-colors`}>
                     {stat.icon}
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                     {stat.change}
                  </span>
               </div>
               
               <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{stat.value}</h3>
               <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Area (Mock) */}
          <div className="lg:col-span-2 bg-[#1a1b23] border border-white/5 rounded-2xl p-6 min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Desempenho Geral</h2>
              <select className="bg-black/20 border border-white/10 rounded-lg text-sm text-gray-300 px-3 py-1 outline-none focus:border-purple-500">
                <option>Últimos 7 dias</option>
                <option>Último Mês</option>
                <option>Este Ano</option>
              </select>
            </div>
            
            {/* CSS Chart Mockup */}
            <div className="h-64 flex items-end justify-between gap-2 px-4 py-8 relative">
               {/* Grid lines */}
               <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                  <div className="w-full h-px bg-white"></div>
                  <div className="w-full h-px bg-white"></div>
                  <div className="w-full h-px bg-white"></div>
                  <div className="w-full h-px bg-white"></div>
                  <div className="w-full h-px bg-white"></div>
               </div>
               
               {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                  <div key={i} className="w-full bg-purple-500/20 rounded-t-sm hover:bg-purple-500/40 transition-all relative group h-full">
                     <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-sm transition-all duration-1000 ease-out"
                        style={{ height: `${h}%` }}
                     ></div>
                     {/* Tooltip */}
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {h}%
                     </div>
                  </div>
               ))}
            </div>
          </div>

          {/* New Features / Quick Access */}
          <div className="bg-[#1a1b23] border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Explore Novas Funcionalidades</h2>
            <div className="space-y-4">
              {[
                { name: 'GovWallet Digital', desc: 'Sua carteira funcional', icon: <GovWalletIcon />, color: 'blue' },
                { name: 'Universidade Corp.', desc: 'Cursos certificados', icon: <EduGovIcon />, color: 'emerald' },
                { name: 'Diário Oficial IA', desc: 'Resumo inteligente', icon: <NewsIcon />, color: 'purple' },
                { name: 'GovMarket', desc: 'Licitações e compras', icon: <MarketplaceIcon />, color: 'orange' },
                { name: 'Saúde Mental', desc: 'Apoio psicológico', icon: <HealthIcon />, color: 'rose' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className={`p-2.5 rounded-lg bg-${feature.color}-500/10 text-${feature.color}-400 group-hover:text-${feature.color}-300 group-hover:bg-${feature.color}-500/20`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-200 group-hover:text-white">{feature.name}</h4>
                    <p className="text-xs text-gray-500">{feature.desc}</p>
                  </div>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                     <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              ))}
              
              <button className="w-full mt-2 py-3 text-xs uppercase tracking-wider font-bold text-gray-500 hover:text-white border-t border-white/5 hover:border-white/20 transition-all">
                Ver todas as 15 funcionalidades
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Features Grid (The "10 functionalities") */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
           {[
              { label: 'Mentoria', icon: <MentorIcon /> },
              { label: 'Inovação', icon: <InnovationIcon /> },
              { label: 'Enquetes', icon: <PollIcon /> },
              { label: 'Legislação', icon: <GavelIcon /> },
              { label: 'Talentos', icon: <StarIcon className="w-6 h-6" /> },
           ].map((item, i) => (
              <div key={i} className="bg-[#1a1b23] border border-white/5 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-purple-500/40 hover:bg-purple-500/5 cursor-pointer transition-all group">
                 <div className="text-gray-400 group-hover:text-purple-400 transition-colors">
                    {item.icon}
                 </div>
                 <span className="text-sm font-medium text-gray-300 group-hover:text-white">{item.label}</span>
              </div>
           ))}
        </div>

      </main>
    </div>
  )
}
