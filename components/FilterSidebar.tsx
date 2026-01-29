'use client'

interface FilterSidebarProps {
  filters: {
    modality: string
    isFree: string
    area: string
    date: string
  }
  setFilters: (filters: any) => void
}

const AREAS = [
  'Direito',
  'Contabilidade',
  'Tecnologia',
  'Gestão Pública',
  'Saúde',
  'Educação',
  'Meio Ambiente',
  'Finanças',
  'Recursos Humanos',
  'Auditoria',
]

export default function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const updateFilter = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: filters[key] === value ? '' : value,
    })
  }

  return (
    <div className="bg-dark-bgSecondary border border-dark-border rounded-xl p-6 sticky top-24">
      <h3 className="text-lg font-bold mb-4">🔍 Filtros</h3>
      
      <div className="space-y-6">
        {/* Modalidade */}
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Modalidade</h4>
          <div className="space-y-2">
            {['online', 'presencial', 'hibrido'].map((mod) => (
              <button
                key={mod}
                onClick={() => updateFilter('modality', mod)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  filters.modality === mod
                    ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 border border-purple-400/40 backdrop-blur-sm'
                    : 'bg-dark-bg/50 backdrop-blur-sm border border-dark-border text-gray-400 hover:border-purple-500/50 hover:bg-dark-bg/80'
                }`}
              >
                {mod === 'online' ? '🌐 Online' : mod === 'presencial' ? '📍 Presencial' : '🔄 Híbrido'}
              </button>
            ))}
          </div>
        </div>

        {/* Gratuito/Pago */}
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Preço</h4>
          <div className="space-y-2">
            {['true', 'false'].map((value) => (
              <button
                key={value}
                onClick={() => updateFilter('isFree', value)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  filters.isFree === value
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'bg-dark-bg border border-dark-border text-gray-400 hover:border-purple-500/50'
                }`}
              >
                {value === 'true' ? '✓ Gratuito' : '💰 Pago'}
              </button>
            ))}
          </div>
        </div>

        {/* Área */}
        <div>
          <h4 className="text-sm font-semibold text-gray-300 mb-3">Área</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {AREAS.map((area) => (
              <button
                key={area}
                onClick={() => updateFilter('area', area)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  filters.area === area
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-dark-bg border border-dark-border text-gray-400 hover:border-blue-500/50'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Limpar filtros */}
        {(filters.modality || filters.isFree || filters.area) && (
          <button
            onClick={() => setFilters({ modality: '', isFree: '', area: '', date: '' })}
            className="w-full px-4 py-2 bg-dark-bg border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm font-medium"
          >
            Limpar Filtros
          </button>
        )}
      </div>
    </div>
  )
}
