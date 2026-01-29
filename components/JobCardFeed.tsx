import { useState } from 'react'
import { Link } from 'react-router-dom'
import ApplicationModal from './ApplicationModal'

interface JobPosting {
  id: string
  title: string
  description?: string
  company: string
  location?: string
  type?: string
  area?: string
  salary?: string
  isRemote?: boolean
}

interface JobCardFeedProps {
  job: JobPosting
}

export default function JobCardFeed({ job }: JobCardFeedProps) {
  const [showApplication, setShowApplication] = useState(false)

  return (
    <>
      <div className="w-full max-w-4xl h-full max-h-[85dvh] sm:max-h-[85vh] bg-dark-bgSecondary border border-dark-border rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-sm flex flex-col shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
        {/* Header com gradiente animado */}
        <div className="relative h-28 sm:h-40 md:h-48 bg-gradient-to-br from-orange-900/80 via-pink-900/80 to-purple-900/80 flex-shrink-0 flex items-center justify-center overflow-hidden group">
          <div className="absolute inset-0 shimmer opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bgSecondary via-transparent to-transparent"></div>
          <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 transform group-hover:scale-105 transition-transform duration-500">
            <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl mb-1 sm:mb-3 md:mb-4 float-animation">💼</div>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-0.5 sm:mb-2 drop-shadow-lg leading-tight">
              {job.title}
            </h2>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/90 font-semibold drop-shadow">
              {job.company}
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar">
          {/* Badges animados */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="inline-block bg-gradient-to-r from-orange-500/30 to-pink-500/30 text-orange-200 text-[10px] sm:text-sm font-bold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full border border-orange-400/40 backdrop-blur-sm hover:scale-110 transition-transform">
              {job.type === 'estagio' ? '🎓 Estágio' : job.type === 'trainee' ? '👔 Trainee' : '💼 Vaga'}
            </span>
            {job.area && (
              <span className="inline-block bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 text-[10px] sm:text-sm font-bold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full border border-purple-400/40 backdrop-blur-sm hover:scale-110 transition-transform">
                {job.area}
              </span>
            )}
            {job.isRemote ? (
              <span className="inline-block bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 text-[10px] sm:text-sm font-bold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full border border-green-400/40 backdrop-blur-sm hover:scale-110 transition-transform">
                🌐 Remoto
              </span>
            ) : job.location && (
              <span className="inline-block bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-200 text-[10px] sm:text-sm font-bold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full border border-blue-400/40 backdrop-blur-sm hover:scale-110 transition-transform">
                📍 {job.location}
              </span>
            )}
          </div>

          {job.description && (
            <div className="mb-4 sm:mb-6">
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>
          )}

          {job.salary && (
            <div className="mb-4 sm:mb-6 bg-dark-bg/50 rounded-xl p-3 sm:p-4 border border-green-500/20">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-gray-400 text-[10px] sm:text-sm">Remuneração</p>
                  <p className="text-green-300 font-bold text-base sm:text-lg md:text-xl">{job.salary}</p>
                </div>
              </div>
            </div>
          )}

          {/* Botão de candidatura com efeito especial */}
          <button
            onClick={() => setShowApplication(true)}
            className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl hover:from-orange-600 hover:via-pink-600 hover:to-purple-600 transition-all glow-orange transform hover:scale-[1.02] shadow-2xl relative overflow-hidden group"
          >
            <span className="relative z-10">Enviar Currículo →</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>

          <Link
            to="/vagas"
            className="block w-full mt-3 sm:mt-4 bg-dark-bg/50 border border-dark-border text-gray-300 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-xs sm:text-base hover:bg-dark-bg hover:border-purple-500/50 transition-all text-center group"
          >
            Ver mais vagas{' '}
            <span className="group-hover:translate-x-2 inline-block transition-transform">→</span>
          </Link>
        </div>
      </div>

      {showApplication && (
        <ApplicationModal
          jobId={job.id}
          jobTitle={job.title}
          company={job.company}
          onClose={() => setShowApplication(false)}
        />
      )}
    </>
  )
}
