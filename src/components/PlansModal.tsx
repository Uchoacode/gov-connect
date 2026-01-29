import { CloseIcon, CheckIcon } from './Icons'

interface PlanProps {
  onClose: () => void
}

export default function PlansModal({ onClose }: PlanProps) {
  const plans = [
    {
      name: 'Membro',
      price: 'Grátis',
      period: 'para sempre',
      description: 'Acesso essencial à rede e vagas públicas.',
      features: [
        'Perfil Profissional Básico',
        'Visualização de Vagas',
        'Networking em Fóruns Abertos',
        'Notícias do Setor'
      ],
      cta: 'Começar Agora',
      popular: false,
      gradient: 'from-gray-700 to-gray-600'
    },
    {
      name: 'Pro',
      price: 'R$ 29,90',
      period: '/mês',
      description: 'Ferramentas avançadas para acelerar sua carreira.',
      features: [
        'Tudo do Plano Membro',
        'GovAdvisor (Mentoria IA)',
        'Destaque em Processos Seletivos',
        'Acesso a Cursos Exclusivos',
        'Estatísticas de Perfil (GovStats)'
      ],
      cta: 'Assinar Pro',
      popular: true,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      name: 'Líder',
      price: 'R$ 59,90',
      period: '/mês',
      description: 'Para gestores que buscam excelência e liderança.',
      features: [
        'Tudo do Plano Pro',
        'Verificação GovID (Blockchain)',
        'Participação em Summit Virtual',
        'Grupos de Liderança Exclusivos',
        'Consultoria de Carreira Trimestral'
      ],
      cta: 'Ser Líder',
      popular: false,
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl bg-[#13141b] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors z-10"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <div className="p-8 lg:p-12 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Escolha seu plano de evolução</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Desbloqueie ferramentas exclusivas, mentorias com IA e oportunidades que vão transformar sua trajetória no serviço público.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative flex flex-col p-8 rounded-2xl border ${
                  plan.popular 
                    ? 'bg-white/5 border-purple-500/50 shadow-xl shadow-purple-900/20 transform md:-translate-y-4' 
                    : 'bg-white/5 border-white/5 hover:border-white/10'
                } transition-all duration-300 group hover:shadow-2xl`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg border border-white/20">
                    MAIS POPULAR
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className={`mt-0.5 w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                        <CheckIcon className="w-3 h-3 text-white" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all transform active:scale-95 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
             <p className="text-gray-500 text-xs">
                * Preços sujeitos a alteração. Cancelamento a qualquer momento. 
                <span className="block mt-1">Para planos corporativos (Órgãos Públicos), <a href="#" className="text-purple-400 hover:underline">fale com nossa equipe</a>.</span>
             </p>
          </div>
        </div>
      </div>
    </div>
  )
}
