'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useState } from 'react'
import ApplicationModal from './ApplicationModal'

interface JobPosting {
  id: string
  title: string
  description: string
  company: string
  location?: string
  type: string
  area?: string
  requirements?: string
  benefits?: string
  salary?: string
  isRemote: boolean
  isActive: boolean
  applicationLink?: string
  createdAt: string
  user: {
    name: string
    avatar?: string
  }
}

interface JobCardProps {
  job: JobPosting
  isCompact?: boolean
}

export default function JobCard({ job, isCompact = false }: JobCardProps) {
  const [showApplication, setShowApplication] = useState(false)

  if (isCompact) {
    return (
      <>
        <div className="w-full h-full bg-dark-bgSecondary border border-dark-border rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm flex flex-col card-hover">
          {/* Header compacto */}
          <div className="relative h-24 sm:h-28 md:h-32 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-orange-900/80 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bgSecondary via-transparent to-transparent"></div>
            <div className="relative z-10 text-center px-3 sm:px-4">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-0.5 sm:mb-1 drop-shadow-lg line-clamp-2">
                {job.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/90 font-semibold drop-shadow line-clamp-1">
                {job.company}
              </p>
            </div>
          </div>

          {/* Conteúdo compacto */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              <span className="inline-block bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-purple-400/40 backdrop-blur-sm">
                {job.type === 'estagio' ? '🎓 Estágio' : job.type === 'trainee' ? '👔 Trainee' : '💼 Efetivo'}
              </span>
              {job.area && (
                <span className="inline-block bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-orange-200 text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-orange-400/40 backdrop-blur-sm">
                  {job.area}
                </span>
              )}
              {job.isRemote ? (
                <span className="inline-block bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-green-400/40 backdrop-blur-sm">
                  🌐 Remoto
                </span>
              ) : (
                <span className="inline-block bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-200 text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-blue-400/40 backdrop-blur-sm">
                  📍 Presencial
                </span>
              )}
            </div>

            {/* Descrição compacta */}
            <div className="mb-3 sm:mb-4">
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                {job.description}
              </p>
            </div>

            {/* Informações compactas */}
            <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
              {job.location && (
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-white text-xs sm:text-sm font-semibold truncate">{job.location}</p>
                </div>
              )}

              {job.salary && (
                <div className="flex items-center space-x-1.5 sm:space-x-2">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-white text-xs sm:text-sm font-semibold truncate">{job.salary}</p>
                </div>
              )}
            </div>

            {/* Botão de candidatura compacto */}
            <button
              onClick={() => setShowApplication(true)}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all glow-purple transform hover:scale-[1.02] shadow-lg"
            >
              Enviar Currículo →
            </button>
          </div>
        </div>

        {/* Modal de candidatura */}
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

  return (
    <>
      <div className="w-full max-w-4xl h-full max-h-[90vh] sm:max-h-[85vh] bg-dark-bgSecondary border border-dark-border rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-sm flex flex-col">
        {/* Header com gradiente */}
        <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-orange-900/80 flex-shrink-0 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bgSecondary via-transparent to-transparent"></div>
          <div className="relative z-10 text-center px-4 sm:px-6 md:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">
              {job.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-semibold drop-shadow">
              {job.company}
            </p>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="inline-block bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 text-xs sm:text-sm font-bold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full border border-purple-400/40 backdrop-blur-sm">
              {job.type === 'estagio' ? '🎓 Estágio' : job.type === 'trainee' ? '👔 Trainee' : '💼 Efetivo'}
            </span>
            {job.area && (
              <span className="inline-block bg-gradient-to-r from-orange-500/30 to-yellow-500/30 text-orange-200 text-xs sm:text-sm font-bold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full border border-orange-400/40 backdrop-blur-sm">
                {job.area}
              </span>
            )}
            {job.isRemote ? (
              <span className="inline-block bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-200 text-xs sm:text-sm font-bold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full border border-green-400/40 backdrop-blur-sm">
                🌐 Remoto
              </span>
            ) : (
              <span className="inline-block bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-blue-200 text-xs sm:text-sm font-bold px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full border border-blue-400/40 backdrop-blur-sm">
                📍 Presencial
              </span>
            )}
          </div>

          {/* Descrição */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3">Sobre a Vaga</h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Informações */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {job.location && (
              <div className="flex items-start space-x-2 sm:space-x-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 mt-0.5 sm:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Localização</p>
                  <p className="text-white font-semibold text-sm sm:text-base">{job.location}</p>
                </div>
              </div>
            )}

            {job.salary && (
              <div className="flex items-start space-x-2 sm:space-x-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 mt-0.5 sm:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-gray-400 text-xs sm:text-sm">Remuneração</p>
                  <p className="text-white font-semibold text-sm sm:text-base">{job.salary}</p>
                </div>
              </div>
            )}
          </div>

          {/* Requisitos */}
          {job.requirements && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3">Requisitos</h3>
              <div className="bg-dark-bg/50 rounded-xl p-3 sm:p-4">
                <p className="text-gray-300 text-sm sm:text-base whitespace-pre-line">{job.requirements}</p>
              </div>
            </div>
          )}

          {/* Benefícios */}
          {job.benefits && (
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3">Benefícios</h3>
              <div className="bg-dark-bg/50 rounded-xl p-3 sm:p-4">
                <p className="text-gray-300 text-sm sm:text-base whitespace-pre-line">{job.benefits}</p>
              </div>
            </div>
          )}

          {/* Botão de candidatura */}
          <button
            onClick={() => setShowApplication(true)}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-3 sm:py-4 md:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all glow-purple transform hover:scale-[1.02] shadow-2xl mb-3 sm:mb-4"
          >
            Enviar Currículo →
          </button>

          {job.applicationLink && (
            <a
              href={job.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-dark-bg/50 border border-dark-border text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base hover:bg-dark-bg transition-all text-center"
            >
              Ou se candidate via site externo
            </a>
          )}
        </div>
      </div>

      {/* Modal de candidatura */}
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
