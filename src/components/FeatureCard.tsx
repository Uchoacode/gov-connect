import { Link } from 'react-router-dom'

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  to: string
  gradient: string
  delay?: number
}

export default function FeatureCard({ title, description, icon, to, gradient, delay = 0 }: FeatureCardProps) {
  return (
    <Link
      to={to}
      className="group relative bg-dark-bgSecondary/50 backdrop-blur-sm border border-dark-border rounded-2xl p-6 hover:border-purple-500/50 transition-all card-hover animate-fade-in-up overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Gradiente de fundo no hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${gradient}`}
      />
      
      {/* Ícone */}
      <div className="relative z-10 text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      {/* Conteúdo */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
          {description}
        </p>
      </div>

      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </div>
    </Link>
  )
}
