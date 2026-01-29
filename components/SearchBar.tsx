'use client'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 md:pl-4 flex items-center pointer-events-none">
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-8 sm:pl-10 md:pl-12 pr-2 sm:pr-3 md:pr-4 py-2 sm:py-3 md:py-4 bg-dark-bgSecondary/90 backdrop-blur-xl border border-purple-500/30 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500/70 transition-all glass hover:border-purple-500/50 shadow-lg text-sm sm:text-base"
        placeholder="🔍 Buscar..."
      />
    </div>
  )
}
