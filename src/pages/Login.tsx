import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProvider'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      // Simulate a small delay for better UX feeling
      setTimeout(() => {
          navigate('/feed')
      }, 500)
    } catch (err) {
      setError('Email ou senha incorretos. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f1014]">
      {/* Background Ambience */}
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-pink-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="w-full max-w-lg px-4 relative z-10">
        <div className="text-center mb-10">
           <h1 className="text-5xl font-black text-white mb-3 tracking-tight">
             Conecte<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Gov</span>
           </h1>
           <p className="text-gray-400 font-medium">Acesse o portal do servidor público do futuro.</p>
        </div>

        <div className="bg-[#1a1b23]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
           {/* Glow Effect */}
           <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
           
           <h2 className="text-2xl font-bold text-white mb-8 text-center">Bem-vindo de volta</h2>

           {error && (
             <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-300 text-sm font-medium animate-shake">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               {error}
             </div>
           )}

           <form onSubmit={handleSubmit} className="space-y-6">
             <div>
               <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Email Corporativo</label>
               <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <svg className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                  </div>
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                     className="block w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-base font-medium"
                     placeholder="nome@orgao.gov.br"
                  />
               </div>
             </div>

             <div>
               <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Senha</label>
                  <Link to="/recuperar-senha" className="text-xs text-purple-400 hover:text-white transition-colors font-semibold">Esqueceu a senha?</Link>
               </div>
               <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                     <svg className="h-5 w-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     className="block w-full pl-12 pr-4 py-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-base font-medium"
                     placeholder="••••••••"
                  />
               </div>
             </div>

             <button type="submit" disabled={loading} className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
               {loading ? (
                  <span className="flex items-center justify-center gap-2">
                     <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     Autenticando...
                  </span>
               ) : 'Entrar'}
             </button>

             <div className="relative flex py-2 items-center">
                 <div className="flex-grow border-t border-white/10"></div>
                 <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase font-bold tracking-wider">Ou entre com</span>
                 <div className="flex-grow border-t border-white/10"></div>
             </div>

             <button type="button" className="w-full bg-[#1351b4] hover:bg-[#0c3d8e] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all border border-transparent hover:border-white/20 shadow-lg">
                <img src="https://www.gov.br/++theme++br.gov.tema/img/favicon.ico" alt="Gov.br" className="w-6 h-6 filter brightness-0 invert" />
                <span>Entrar com gov.br</span>
             </button>
           </form>

           <div className="mt-8 text-center">
             <p className="text-gray-400">
               Ainda não faz parte?{' '}
               <Link to="/cadastro" className="text-white font-bold hover:underline decoration-purple-500 underline-offset-4 decoration-2">
                 Criar conta
               </Link>
             </p>
           </div>
        </div>

        <div className="mt-8 text-center">
           <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white transition-colors text-sm font-medium">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Voltar ao Início
           </Link>
        </div>
      </div>
    </div>
  )
}
