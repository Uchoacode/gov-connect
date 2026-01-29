import { ReactNode } from 'react'

interface TechFeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  color: string
  delay?: number
}

export default function TechFeatureCard({ title, description, icon, color, delay = 0 }: TechFeatureCardProps) {
  return (
    <div 
      className="relative group p-6 rounded-2xl bg-[#1a1b23]/50 border border-white/5 hover:bg-[#1a1b23] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden backdrop-blur-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Hover Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
      
      {/* Icon Container with Glow */}
      <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-white bg-gradient-to-br ${color} bg-opacity-10 shadow-lg group-hover:scale-110 transition-transform duration-500 relative`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${color} blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
        <div className="relative z-10">
           {icon}
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{title}</h3>
      <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{description}</p>
      
      {/* Tech Decoration Lines */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/5 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-20 group-hover:h-20"></div>
    </div>
  )
}
