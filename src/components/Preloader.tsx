import { useState, useEffect } from 'react'
import logoConecteGov from '../../logo-conecte-gov.png'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    // Sequência de animação
    setTimeout(() => setShowText(true), 600)

    const timer = setTimeout(() => {
      setIsFading(true)
      setTimeout(() => {
        setIsVisible(false)
        onComplete()
      }, 700) 
    }, 2500)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f1014] transition-all duration-700 ${
        isFading ? 'opacity-0 scale-105 filter blur-sm' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Container da Logo */}
        <div className="relative mb-0 transition-all duration-700 ease-out transform">
           
           {/* Efeitos de Fundo */}
           <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
           
        {/* Texto com Reveal Animation */}
        <div className="relative z-10">
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent tracking-tight animate-pulse">
            Conecte<span className="font-extrabold text-white">Gov</span>
            </h1>
        </div>
        </div>

        {/* Loading Bar */}
        <div className="mt-8 relative w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
           <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full animate-progress-bar w-full origin-left"></div>
        </div>
      </div>
    </div>
  )
}
