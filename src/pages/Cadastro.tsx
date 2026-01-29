import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

const ESTADOS_BRASIL = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]

const AREAS_FORMACAO = ['Administração', 'Direito', 'Economia', 'Tecnologia', 'Engenharia', 'Saúde', 'Educação', 'Outros']
const NIVEL_FORMACAO = ['Ensino Médio', 'Superior Incompleto', 'Superior Completo', 'Pós-Graduação', 'Mestrado', 'Doutorado']
const TIPOS_CONSULTA = ['Portal da Transparência', 'Diário Oficial', 'Site do Órgão', 'Indicação', 'Outros']
const TIPOS_OPORTUNIDADE = ['Estágio', 'Trainee', 'Cargo Efetivo', 'Cargo Comissionado', 'Voluntariado']
const REGIMES_TRABALHO = ['Presencial', 'Híbrido', 'Remoto']

export default function Cadastro() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  // Dados do formulário
  const [formData, setFormData] = useState({
    // Passo 1: Dados básicos
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    tipoUsuario: 'consumer', // consumer ou publisher

    // Passo 2: Profissional
    cargo: '',
    formacaoArea: '',
    formacaoNivel: '',
    consultouServidor: false,
    tipoConsulta: '',
    buscaOportunidade: false,
    tipoOportunidade: [] as string[],
    regimeTrabalho: [] as string[],
    resumoProfissional: '',
    disponibilidade: '',
    interesses: [] as string[],
    competencias: [] as string[],
    areaInteresse: [] as string[], 

    // Passo 3: Endereço
    cep: '',
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    numero: '',
    complemento: '',

    // Passo 4: Informações adicionais
    bio: '',
    organizacao: '',
    website: '',
    area: '',
  })

  const AREAS_INTERESSE = [
    'Gestão Pública', 'Tecnologia da Informação', 'Direito Administrativo', 'Recursos Humanos',
    'Finanças Públicas', 'Planejamento e Orçamento', 'Controle e Transparência', 'Saúde Pública',
    'Educação', 'Meio Ambiente', 'Infraestrutura', 'Segurança Pública'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d)/, '$1.$2')
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      setFormData(prev => ({ ...prev, cpf: value }))
    }
  }

  const handleAreaInteresseToggle = (area: string) => {
    setFormData(prev => {
      const current = prev.areaInteresse || []
      if (current.includes(area)) {
        return { ...prev, areaInteresse: current.filter(a => a !== area) }
      } else {
        return { ...prev, areaInteresse: [...current, area] }
      }
    })
  }

  const handleCepBlur = async () => {
    if (formData.cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`)
        const data = await response.json()
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            estado: data.uf || prev.estado,
            cidade: data.localidade || prev.cidade,
            bairro: data.bairro || prev.bairro,
            rua: data.logradouro || prev.rua,
          }))
        }
      } catch (err) {
        console.error('Erro ao buscar CEP:', err)
      }
    }
  }

  // Validações simplificadas para demonstração
  const validateStep1 = () => {
    if (!formData.nome.trim()) return setError('Nome é obrigatório') || false
    if (!formData.email.trim() || !formData.email.includes('@')) return setError('Email inválido') || false
    if (formData.senha.length < 6) return setError('Senha deve ter no mínimo 6 caracteres') || false
    if (formData.senha !== formData.confirmarSenha) return setError('Senhas não conferem') || false
    return true
  }

  const validateStep2 = () => {
     if (!formData.cargo.trim()) return setError('Cargo é obrigatório') || false
     if (formData.areaInteresse.length === 0) return setError('Selecione ao menos uma área de interesse') || false
     return true
  }

  const validateStep3 = () => {
     if (!formData.cep || formData.cep.length !== 8) return setError('CEP inválido') || false
     if (!formData.estado) return setError('Estado é obrigatório') || false
     if (!formData.cidade) return setError('Cidade é obrigatória') || false
     return true
  }

  const validateStep4 = () => true // Opcional ou validação simples

  const handleNext = () => {
    setError('')
    if (currentStep === 1 && !validateStep1()) return
    if (currentStep === 2 && !validateStep2()) return
    if (currentStep === 3 && !validateStep3()) return
    if (currentStep === 4 && !validateStep4()) return
    
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      setError('')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(formData.nome, formData.email, formData.senha, formData.tipoUsuario)
      navigate('/feed')
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1014] py-12 px-4 selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block text-4xl font-black text-white mb-3 tracking-tight hover:opacity-90 transition-opacity">
            Conecte<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Gov</span>
          </Link>
          <p className="text-gray-400 text-lg">Junte-se à maior rede de inovação pública.</p>
        </div>

        {/* Progress System */}
        <div className="mb-10 max-w-2xl mx-auto">
           <div className="flex justify-between mb-4">
              {['Dados Pessoais', 'Profissional', 'Endereço', 'Finalização'].map((label, idx) => {
                 const stepNum = idx + 1
                 const isActive = stepNum === currentStep
                 const isCompleted = stepNum < currentStep
                 
                 return (
                    <div key={idx} className="flex flex-col items-center relative z-10 w-24">
                       <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 mb-2 ${
                          isActive ? 'bg-white text-black scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 
                          isCompleted ? 'bg-purple-500 text-white' : 'bg-[#1a1b23] border border-white/10 text-gray-500'
                       }`}>
                          {isCompleted ? '✓' : stepNum}
                       </div>
                       <span className={`text-[10px] uppercase font-bold tracking-wider ${isActive ? 'text-white' : isCompleted ? 'text-purple-400' : 'text-gray-600'}`}>
                          {label}
                       </span>
                    </div>
                 )
              })}
           </div>
           {/* Progress Bar Background */}
           <div className="relative h-1 bg-[#1a1b23] rounded-full -mt-14 mx-4 z-0 top-6">
              <div 
                 className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                 style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              ></div>
           </div>
        </div>
        
        {/* Main Card */}
        <div className="bg-[#1a1b23] rounded-3xl p-8 sm:p-12 border border-white/5 shadow-2xl relative mt-16 animate-fade-in-up">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-t-3xl opacity-50"></div>
           
           <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center sm:text-left">
             {currentStep === 1 && 'Vamos começar pelo básico'}
             {currentStep === 2 && 'Conte-nos sobre sua carreira'}
             {currentStep === 3 && 'Onde você está localizado?'}
             {currentStep === 4 && 'Últimos detalhes'}
           </h2>

           {error && (
             <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-300 text-sm font-medium animate-shake">
               ⚠️ {error}
             </div>
           )}

           <form onSubmit={currentStep === totalSteps ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
             {/* STEP 1 */}
             {currentStep === 1 && (
               <div className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nome Completo</label>
                       <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="Ex: Maria Silva" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">CPF</label>
                       <input type="text" name="cpf" value={formData.cpf} onChange={handleCpfChange} maxLength={14} required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="000.000.000-00" />
                    </div>
                 </div>

                 <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Corporativo ou Pessoal</label>
                     <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="nome@exemplo.com" />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Senha</label>
                       <input type="password" name="senha" value={formData.senha} onChange={handleInputChange} required minLength={6} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Confirmar Senha</label>
                       <input type="password" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleInputChange} required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="••••••••" />
                    </div>
                 </div>
                 
                 <div className="pt-4">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 mb-3 block">Como você deseja usar a plataforma?</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div 
                          onClick={() => setFormData({...formData, tipoUsuario: 'consumer'})}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.tipoUsuario === 'consumer' ? 'bg-purple-500/10 border-purple-500 ring-1 ring-purple-500' : 'bg-black/20 border-white/10 hover:border-white/30'}`}
                       >
                          <div className="flex items-center gap-3">
                             <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.tipoUsuario === 'consumer' ? 'border-purple-500' : 'border-gray-500'}`}>
                                {formData.tipoUsuario === 'consumer' && <div className="w-3 h-3 bg-purple-500 rounded-full"></div>}
                             </div>
                             <div>
                                <h4 className="font-bold text-white text-sm">Explorar Conteúdo</h4>
                                <p className="text-xs text-gray-400 mt-1">Busco vagas, cursos e notícias.</p>
                             </div>
                          </div>
                       </div>
                       <div 
                          onClick={() => setFormData({...formData, tipoUsuario: 'publisher'})}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.tipoUsuario === 'publisher' ? 'bg-purple-500/10 border-purple-500 ring-1 ring-purple-500' : 'bg-black/20 border-white/10 hover:border-white/30'}`}
                       >
                          <div className="flex items-center gap-3">
                             <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.tipoUsuario === 'publisher' ? 'border-purple-500' : 'border-gray-500'}`}>
                                {formData.tipoUsuario === 'publisher' && <div className="w-3 h-3 bg-purple-500 rounded-full"></div>}
                             </div>
                             <div>
                                <h4 className="font-bold text-white text-sm">Publicar e Gerenciar</h4>
                                <p className="text-xs text-gray-400 mt-1">Quero divulgar vagas e eventos.</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>
             )}

             {/* STEP 2 */}
             {currentStep === 2 && (
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Cargo Atual</label>
                     <input type="text" name="cargo" value={formData.cargo} onChange={handleInputChange} required className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="Ex: Analista Administrativo" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Área de Formação</label>
                       <select name="formacaoArea" value={formData.formacaoArea} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none appearance-none">
                          <option value="">Selecione...</option>
                          {AREAS_FORMACAO.map(a => <option key={a} value={a}>{a}</option>)}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nível de Formação</label>
                       <select name="formacaoNivel" value={formData.formacaoNivel} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none appearance-none">
                          <option value="">Selecione...</option>
                          {NIVEL_FORMACAO.map(n => <option key={n} value={n}>{n}</option>)}
                       </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Quais suas áreas de interesse?</label>
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-black/20 rounded-xl border border-white/5 max-h-60 overflow-y-auto custom-scrollbar">
                        {AREAS_INTERESSE.map(area => (
                           <label key={area} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${formData.areaInteresse.includes(area) ? 'bg-purple-500/20 text-purple-300' : 'hover:bg-white/5 text-gray-400'}`}>
                              <input type="checkbox" checked={formData.areaInteresse.includes(area)} onChange={() => handleAreaInteresseToggle(area)} className="hidden" />
                              <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.areaInteresse.includes(area) ? 'border-purple-400 bg-purple-400' : 'border-gray-600'}`}>
                                 {formData.areaInteresse.includes(area) && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <span className="text-xs font-medium">{area}</span>
                           </label>
                        ))}
                     </div>
                  </div>
               </div>
             )}

             {/* STEP 3 */}
             {currentStep === 3 && (
               <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-6">
                     <div className="space-y-2 col-span-3 sm:col-span-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">CEP</label>
                        <input type="text" name="cep" value={formData.cep} onChange={handleInputChange} onBlur={handleCepBlur} maxLength={8} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="00000000" />
                     </div>
                     <div className="space-y-2 col-span-3 sm:col-span-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Cidade</label>
                        <input type="text" name="cidade" value={formData.cidade} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="Cidade" />
                     </div>
                     <div className="space-y-2 col-span-3 sm:col-span-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">UF</label>
                        <select name="estado" value={formData.estado} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none appearance-none">
                           <option value="">UF</option>
                           {ESTADOS_BRASIL.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                        </select>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="md:col-span-2 space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Rua / Avenida</label>
                        <input type="text" name="rua" value={formData.rua} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="Logradouro" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Número</label>
                        <input type="text" name="numero" value={formData.numero} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="Nº" />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Bairro</label>
                        <input type="text" name="bairro" value={formData.bairro} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="Bairro" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Complemento</label>
                        <input type="text" name="complemento" value={formData.complemento} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="Apto, Bloco..." />
                     </div>
                  </div>
               </div>
             )}

             {/* STEP 4 */}
             {currentStep === 4 && (
               <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Bio / Resumo Profissional</label>
                    <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none resize-none" placeholder="Conte um pouco sobre sua experiência e objetivos..." />
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Organização Atual (Opcional)</label>
                       <input type="text" name="organizacao" value={formData.organizacao} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="Empresa ou Órgão" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Website / LinkedIn (Opcional)</label>
                       <input type="text" name="website" value={formData.website} onChange={handleInputChange} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-purple-500/50 transition-all outline-none" placeholder="https://..." />
                    </div>
                 </div>

                 <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 flex items-start gap-3 mt-4">
                    <div className="bg-purple-500 rounded-full p-1 mt-0.5">
                       <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                       <h4 className="text-white font-bold text-sm">Tudo pronto!</h4>
                       <p className="text-gray-400 text-xs mt-1">Ao clicar em "Finalizar Cadastro", você concorda com nossos termos de uso e política de privacidade.</p>
                    </div>
                 </div>
               </div>
             )}

             {/* Buttons */}
             <div className="flex gap-4 mt-8 pt-6 border-t border-white/10">
               {currentStep > 1 && (
                 <button type="button" onClick={handleBack} className="flex-1 bg-transparent border border-white/10 text-white py-4 rounded-xl font-bold hover:bg-white/5 transition-colors">
                   Voltar
                 </button>
               )}
               <button type="submit" disabled={loading} className="flex-[2] bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-[1.01] shadow-lg disabled:opacity-50">
                 {loading ? 'Processando...' : currentStep === totalSteps ? 'Finalizar Cadastro' : 'Continuar'}
               </button>
             </div>
           </form>
        </div>
        
        <p className="text-center text-gray-500 mt-8 text-sm">
           Já tem uma conta? <Link to="/login" className="text-white font-bold hover:underline">Fazer Login</Link>
        </p>
      </div>
    </div>
  )
}
