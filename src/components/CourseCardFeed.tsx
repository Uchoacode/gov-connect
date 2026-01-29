import { Link } from 'react-router-dom'

export interface FeedCourse {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  level: string
  category: string
  enrolled: number
  rating: number
  image?: string
}

interface CourseCardFeedProps {
  course: FeedCourse
}

export default function CourseCardFeed({ course }: CourseCardFeedProps) {
  const formatEnrolled = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`
    }
    return num.toString()
  }

  return (
    <div className="w-full h-full lg:h-auto max-w-2xl mx-auto bg-[#13131f] sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 relative group border-x-0 sm:border border-white/5 flex flex-col">
      
       {/* MOBILE REELS VIEW (Background Image & Overlay) */}
       <div className="lg:hidden absolute inset-0 z-0">
          <img 
             src={course.image || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1080'} 
             alt={course.title} 
             className="w-full h-full object-cover animate-ken-burns opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          
          {/* Floating Badge Mobile */}
          <div className="absolute top-24 left-4 z-10">
             <span className="px-3 py-1 bg-emerald-500/80 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/20 shadow-lg">
                {course.category}
             </span>
          </div>
       </div>

      {/* Desktop Background Glow Effect */}
      <div className="hidden lg:block absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Header (Desktop) */}
      <div className="hidden lg:block relative p-5 sm:p-6 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                {course.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug line-clamp-2">
              {course.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                👤
              </span>
              <span className="truncate">{course.instructor}</span>
            </p>
          </div>
          
          <div className="flex-shrink-0 bg-gradient-to-b from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-3 flex flex-col items-center min-w-[60px] backdrop-blur-sm">
             <span className="text-xl">⭐</span>
             <span className="text-xs font-bold text-emerald-300 mt-1">{course.rating}</span>
          </div>
        </div>
      </div>

      {/* Conteúdo principal (Unified) */}
      <div className="relative z-10 flex-1 flex flex-col justify-end lg:justify-start p-6 lg:p-6 space-y-5 pb-36 lg:pb-6">
         
         {/* Mobile Header (Bottom) */}
         <div className="lg:hidden animate-slide-up">
            <div className="flex items-center gap-2 mb-2">
               <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">🎓</span>
               <span className="text-xs font-bold text-gray-300">{course.instructor}</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2 leading-tight text-shadow">
              {course.title}
            </h2>
            <div className="flex items-center gap-3 text-gray-200 text-xs font-medium mb-4">
               <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md backdrop-blur-md">
                   ⏱️ {course.duration}
               </span>
               <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md backdrop-blur-md">
                   ⭐ {course.rating}
               </span>
               <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md backdrop-blur-md">
                   👥 {formatEnrolled(course.enrolled)}
               </span>
            </div>
         </div>

        {/* Descrição */}
        <p className="text-gray-200 lg:text-gray-300 text-sm leading-relaxed line-clamp-4 lg:line-clamp-3 font-medium lg:font-normal text-shadow lg:text-shadow-none">
          {course.description}
        </p>

        {/* Desktop Grid (Hidden on Mobile) */}
        <div className="hidden lg:grid grid-cols-2 gap-3">
          <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5 flex items-center gap-3">
            <div className="text-lg opacity-80">⏱️</div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Duração</div>
              <div className="text-xs font-semibold text-gray-200">{course.duration}</div>
            </div>
          </div>
          
          <div className="bg-white/[0.03] rounded-xl p-3 border border-white/5 flex items-center gap-3">
            <div className="text-lg opacity-80">📊</div>
            <div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Nível</div>
              <div className="text-xs font-semibold text-gray-200">{course.level}</div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex gap-3 pt-2 mt-auto">
          <button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-4 lg:py-3.5 rounded-xl font-bold text-sm text-center shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02] active:scale-95 animate-pulse-glow">
            Inscrever-se Grátis
          </button>
           
          {/* Reaction Buttons (Mobile Style) */}
          <button className="lg:hidden w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl active:scale-75 transition-transform">
             ➕
          </button>

          <Link
            to="/cursos"
            className="hidden lg:flex px-4 bg-white/5 border border-white/10 text-gray-300 rounded-xl items-center justify-center hover:bg-white/10 transition-colors"
            title="Ver mais cursos"
          >
            📚
          </Link>
        </div>
      </div>
    </div>
  )
}
