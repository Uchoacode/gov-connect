'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import JobCard from '@/components/JobCard'
import Link from 'next/link'

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

export default function VagasPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/vagas')
      if (response.ok) {
        const data = await response.json()
        setJobs(data.filter((job: JobPosting) => job.isActive) || [])
      } else {
        // Dados mockados completos
        setJobs(getMockJobs())
      }
    } catch (error) {
      console.error('Erro ao carregar vagas:', error)
      // Em caso de erro, usar dados mockados
      setJobs(getMockJobs())
    } finally {
      setLoading(false)
    }
  }

  const getMockJobs = (): JobPosting[] => {
    return [
      {
        id: '1',
        title: 'Estagiário de Tecnologia',
        description: 'Oportunidade para estudante de TI trabalhar com desenvolvimento de sistemas para o setor público. Aprenda com uma equipe experiente! Trabalhe em projetos inovadores e faça parte da transformação digital. Desenvolvimento de aplicações web e mobile, APIs RESTful, e sistemas de gestão pública.',
        company: 'Secretaria de Tecnologia',
        location: 'Brasília - DF',
        type: 'estagio',
        area: 'Tecnologia',
        requirements: 'Cursando TI, conhecimento em programação (JavaScript, Python ou Java), proatividade, trabalho em equipe, conhecimento básico em banco de dados',
        benefits: 'Auxílio transporte R$ 400, vale refeição R$ 600, experiência prática, mentoria técnica, ambiente inovador',
        salary: 'R$ 800 - R$ 1.200',
        isRemote: false,
        isActive: true,
        createdAt: new Date().toISOString(),
        user: { name: 'Secretaria de Tecnologia' },
      },
      {
        id: '2',
        title: 'Estagiário de Gestão Pública',
        description: 'Venha fazer parte da equipe de gestão pública! Trabalhe com projetos importantes que impactam a sociedade. Ambiente colaborativo e oportunidades de crescimento. Atuação em políticas públicas, análise de indicadores e desenvolvimento de estratégias governamentais.',
        company: 'Ministério da Administração',
        location: 'Remoto',
        type: 'estagio',
        area: 'Gestão Pública',
        requirements: 'Cursando Administração, Direito ou áreas afins. Inglês intermediário desejável, conhecimento em Excel avançado, boa comunicação',
        benefits: 'Remoto, horário flexível, mentoria, certificado de conclusão, participação em projetos estratégicos',
        salary: 'R$ 900 - R$ 1.300',
        isRemote: true,
        isActive: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Ministério da Administração' },
      },
      {
        id: '3',
        title: 'Estagiário de Contabilidade',
        description: 'Estágio na área contábil do setor público. Aprenda sobre orçamento público, contas públicas e controle fiscal. Excelente oportunidade para estudantes de Ciências Contábeis. Trabalhe com demonstrações contábeis, análise de despesas e receitas públicas.',
        company: 'Tribunal de Contas',
        location: 'São Paulo - SP',
        type: 'estagio',
        area: 'Contabilidade',
        requirements: 'Cursando Ciências Contábeis do 5º semestre em diante, conhecimento em contabilidade pública, atenção aos detalhes',
        benefits: 'Vale refeição R$ 500, auxílio transporte R$ 350, experiência em órgão de controle, aprendizado em auditoria pública',
        salary: 'R$ 950 - R$ 1.150',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Tribunal de Contas' },
      },
      {
        id: '4',
        title: 'Estagiário de Direito',
        description: 'Estágio na área jurídica trabalhando com processos administrativos, licitações e contratos públicos. Ambiente profissional e desafios reais. Atuação em análise de editais, elaboração de pareceres jurídicos e acompanhamento processual.',
        company: 'Procuradoria Geral',
        location: 'Rio de Janeiro - RJ',
        type: 'estagio',
        area: 'Direito',
        requirements: 'Cursando Direito do 7º semestre em diante, conhecimento em Direito Administrativo, boa escrita jurídica, raciocínio lógico',
        benefits: 'Auxílio transporte R$ 400, vale refeição R$ 550, experiência jurídica prática, contato com processos reais',
        salary: 'R$ 1.000 - R$ 1.400',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Procuradoria Geral' },
      },
      {
        id: '5',
        title: 'Trainee em Comunicação',
        description: 'Programa de trainee em comunicação pública. Desenvolva campanhas, gerencie redes sociais e aprenda sobre comunicação governamental. Criação de conteúdo, gestão de mídias sociais, produção de materiais gráficos e assessoria de imprensa.',
        company: 'Secretaria de Comunicação',
        location: 'Belo Horizonte - MG',
        type: 'trainee',
        area: 'Comunicação',
        requirements: 'Superior completo em Comunicação, Jornalismo ou Publicidade. Portfólio desejável, conhecimento em design gráfico, redação publicitária',
        benefits: 'Plano de carreira estruturado, capacitação contínua, benefícios completos (VR, VT, plano de saúde), ambiente criativo',
        salary: 'R$ 2.500 - R$ 3.500',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Secretaria de Comunicação' },
      },
      {
        id: '6',
        title: 'Estagiário de Recursos Humanos',
        description: 'Trabalhe com processos de RH no setor público. Aprendizado em gestão de pessoas, processos seletivos e desenvolvimento organizacional. Atuação em recrutamento, seleção, treinamento e desenvolvimento de servidores públicos.',
        company: 'Departamento de RH',
        location: 'Remoto',
        type: 'estagio',
        area: 'Recursos Humanos',
        requirements: 'Cursando Administração, Psicologia ou áreas afins, conhecimento em processos de RH, boa comunicação interpessoal',
        benefits: 'Remoto, flexibilidade de horário, aprendizado em RH público, mentoria em gestão de pessoas',
        salary: 'R$ 850 - R$ 1.100',
        isRemote: true,
        isActive: true,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Departamento de RH' },
      },
      {
        id: '7',
        title: 'Estagiário de Engenharia Civil',
        description: 'Estágio na área de engenharia civil trabalhando com projetos de infraestrutura pública. Acompanhamento de obras, análise de projetos, elaboração de laudos técnicos e fiscalização de contratos. Excelente oportunidade para aprender sobre obras públicas.',
        company: 'Secretaria de Obras',
        location: 'Curitiba - PR',
        type: 'estagio',
        area: 'Engenharia',
        requirements: 'Cursando Engenharia Civil do 6º semestre em diante, conhecimento em AutoCAD, interesse em obras públicas',
        benefits: 'Auxílio transporte, vale refeição, experiência prática em obras públicas, certificado de conclusão',
        salary: 'R$ 1.200 - R$ 1.600',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Secretaria de Obras' },
      },
      {
        id: '8',
        title: 'Estagiário de Economia',
        description: 'Estágio na área econômica do setor público. Trabalhe com análise de indicadores econômicos, estudos de viabilidade e planejamento orçamentário. Aprenda sobre economia pública e políticas econômicas governamentais.',
        company: 'Secretaria de Planejamento',
        location: 'Porto Alegre - RS',
        type: 'estagio',
        area: 'Economia',
        requirements: 'Cursando Economia do 5º semestre em diante, conhecimento em estatística, Excel avançado, interesse em políticas públicas',
        benefits: 'Vale refeição, auxílio transporte, experiência em análise econômica, participação em estudos estratégicos',
        salary: 'R$ 1.000 - R$ 1.400',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Secretaria de Planejamento' },
      },
      {
        id: '9',
        title: 'Estagiário de Arquitetura',
        description: 'Estágio na área de arquitetura trabalhando com projetos de espaços públicos, equipamentos urbanos e planejamento urbano. Desenvolvimento de projetos arquitetônicos, acompanhamento de obras e elaboração de estudos urbanísticos.',
        company: 'Secretaria de Urbanismo',
        location: 'Salvador - BA',
        type: 'estagio',
        area: 'Arquitetura',
        requirements: 'Cursando Arquitetura e Urbanismo do 6º semestre em diante, conhecimento em AutoCAD, Revit ou SketchUp, interesse em arquitetura pública',
        benefits: 'Auxílio transporte, vale refeição, experiência em projetos públicos, portfólio profissional',
        salary: 'R$ 1.100 - R$ 1.500',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Secretaria de Urbanismo' },
      },
      {
        id: '10',
        title: 'Estagiário de Enfermagem',
        description: 'Estágio na área de saúde pública. Trabalhe em unidades básicas de saúde, programas de prevenção e promoção da saúde. Acompanhamento de pacientes, campanhas de vacinação e educação em saúde comunitária.',
        company: 'Secretaria de Saúde',
        location: 'Recife - PE',
        type: 'estagio',
        area: 'Saúde',
        requirements: 'Cursando Enfermagem do 6º semestre em diante, registro no COREN (ou em processo), interesse em saúde pública',
        benefits: 'Auxílio transporte, vale refeição, experiência prática em saúde pública, certificado de conclusão',
        salary: 'R$ 900 - R$ 1.300',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Secretaria de Saúde' },
      },
      {
        id: '11',
        title: 'Estagiário de Pedagogia',
        description: 'Estágio na área de educação pública. Trabalhe com desenvolvimento de projetos pedagógicos, acompanhamento de alunos e apoio à gestão escolar. Atuação em escolas públicas, programas educacionais e formação de professores.',
        company: 'Secretaria de Educação',
        location: 'Fortaleza - CE',
        type: 'estagio',
        area: 'Educação',
        requirements: 'Cursando Pedagogia do 5º semestre em diante, interesse em educação pública, boa comunicação, criatividade',
        benefits: 'Auxílio transporte, vale refeição, experiência em educação pública, certificado de conclusão',
        salary: 'R$ 850 - R$ 1.200',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Secretaria de Educação' },
      },
      {
        id: '12',
        title: 'Estagiário de Meio Ambiente',
        description: 'Estágio na área ambiental trabalhando com projetos de sustentabilidade, licenciamento ambiental e educação ambiental. Acompanhamento de processos de licenciamento, elaboração de relatórios ambientais e campanhas de conscientização.',
        company: 'Secretaria de Meio Ambiente',
        location: 'Remoto',
        type: 'estagio',
        area: 'Meio Ambiente',
        requirements: 'Cursando Engenharia Ambiental, Biologia ou áreas afins do 5º semestre em diante, interesse em políticas ambientais',
        benefits: 'Remoto, horário flexível, experiência em gestão ambiental, participação em projetos sustentáveis',
        salary: 'R$ 950 - R$ 1.300',
        isRemote: true,
        isActive: true,
        createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Secretaria de Meio Ambiente' },
      },
      {
        id: '13',
        title: 'Estagiário de Assistência Social',
        description: 'Estágio na área de assistência social trabalhando com programas sociais, atendimento a famílias vulneráveis e desenvolvimento de políticas públicas. Atuação em CRAS, CREAS e programas de transferência de renda.',
        company: 'Secretaria de Assistência Social',
        location: 'Belo Horizonte - MG',
        type: 'estagio',
        area: 'Assistência Social',
        requirements: 'Cursando Serviço Social do 5º semestre em diante, interesse em políticas sociais, empatia, boa comunicação',
        benefits: 'Auxílio transporte, vale refeição, experiência prática em assistência social, certificado de conclusão',
        salary: 'R$ 900 - R$ 1.250',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Secretaria de Assistência Social' },
      },
      {
        id: '14',
        title: 'Estagiário de Marketing Digital',
        description: 'Estágio na área de marketing digital do setor público. Trabalhe com gestão de redes sociais, criação de campanhas digitais, análise de métricas e produção de conteúdo. Aprenda sobre comunicação digital governamental.',
        company: 'Secretaria de Comunicação Digital',
        location: 'Remoto',
        type: 'estagio',
        area: 'Marketing',
        requirements: 'Cursando Marketing, Publicidade ou áreas afins, conhecimento em redes sociais, criatividade, interesse em marketing público',
        benefits: 'Remoto, horário flexível, experiência em marketing digital, portfólio profissional, ambiente criativo',
        salary: 'R$ 1.000 - R$ 1.400',
        isRemote: true,
        isActive: true,
        createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Secretaria de Comunicação Digital' },
      },
      {
        id: '15',
        title: 'Estagiário de Segurança Pública',
        description: 'Estágio na área de segurança pública trabalhando com análise de dados, planejamento de ações preventivas e apoio à gestão de segurança. Trabalhe com estatísticas criminais, mapeamento de áreas de risco e desenvolvimento de políticas de segurança.',
        company: 'Secretaria de Segurança Pública',
        location: 'São Paulo - SP',
        type: 'estagio',
        area: 'Segurança',
        requirements: 'Cursando Direito, Administração Pública ou áreas afins do 6º semestre em diante, interesse em segurança pública, análise de dados',
        benefits: 'Auxílio transporte, vale refeição, experiência em segurança pública, certificado de conclusão',
        salary: 'R$ 1.100 - R$ 1.500',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Secretaria de Segurança Pública' },
      },
      {
        id: '16',
        title: 'Analista de Políticas Públicas',
        description: 'Vaga para analista júnior em políticas públicas. Trabalhe na elaboração, monitoramento e avaliação de políticas públicas. Análise de indicadores sociais, elaboração de relatórios e participação em projetos estratégicos do governo.',
        company: 'Ministério do Desenvolvimento Social',
        location: 'Brasília - DF',
        type: 'efetivo',
        area: 'Políticas Públicas',
        requirements: 'Superior completo em Administração Pública, Ciências Sociais, Economia ou áreas afins. Experiência de 1-2 anos desejável, conhecimento em análise de dados, Excel avançado, boa redação',
        benefits: 'Plano de carreira, salário competitivo, vale refeição R$ 800, auxílio transporte, plano de saúde, participação em projetos estratégicos',
        salary: 'R$ 4.500 - R$ 6.500',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Ministério do Desenvolvimento Social' },
      },
      {
        id: '17',
        title: 'Técnico em Gestão de Projetos',
        description: 'Vaga para técnico em gestão de projetos públicos. Acompanhamento de projetos governamentais, elaboração de cronogramas, gestão de recursos e relatórios de acompanhamento. Trabalhe com metodologias ágeis e ferramentas de gestão.',
        company: 'Secretaria de Planejamento e Gestão',
        location: 'Remoto',
        type: 'efetivo',
        area: 'Gestão de Projetos',
        requirements: 'Superior completo em Administração, Engenharia ou áreas afins. Certificação PMP ou Scrum desejável, experiência em gestão de projetos, conhecimento em MS Project ou similar',
        benefits: 'Remoto, horário flexível, plano de saúde, vale refeição, auxílio transporte, capacitação contínua',
        salary: 'R$ 5.000 - R$ 7.000',
        isRemote: true,
        isActive: true,
        createdAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Secretaria de Planejamento e Gestão' },
      },
      {
        id: '18',
        title: 'Estagiário de Auditoria',
        description: 'Estágio na área de auditoria pública. Aprenda sobre controle interno, auditoria de processos, análise de conformidade e elaboração de relatórios de auditoria. Excelente oportunidade para estudantes de Contabilidade ou Administração.',
        company: 'Controladoria Geral do Estado',
        location: 'Belo Horizonte - MG',
        type: 'estagio',
        area: 'Auditoria',
        requirements: 'Cursando Contabilidade, Administração ou áreas afins do 6º semestre em diante, conhecimento em auditoria, atenção aos detalhes, raciocínio lógico',
        benefits: 'Auxílio transporte R$ 400, vale refeição R$ 600, experiência em auditoria pública, certificado de conclusão',
        salary: 'R$ 1.000 - R$ 1.400',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Controladoria Geral do Estado' },
      },
      {
        id: '19',
        title: 'Assistente de Licitações',
        description: 'Vaga para assistente na área de licitações públicas. Trabalhe com elaboração de editais, análise de propostas, acompanhamento de processos licitatórios e gestão de contratos. Aprenda sobre a Lei 8.666/93 e legislação de licitações.',
        company: 'Secretaria de Licitações',
        location: 'Rio de Janeiro - RJ',
        type: 'trainee',
        area: 'Licitações',
        requirements: 'Superior completo em Direito, Administração ou áreas afins. Conhecimento em licitações públicas desejável, boa escrita, atenção aos detalhes',
        benefits: 'Plano de carreira, capacitação em licitações, vale refeição R$ 700, auxílio transporte, plano de saúde',
        salary: 'R$ 2.800 - R$ 3.800',
        isRemote: false,
        isActive: true,
        createdAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Secretaria de Licitações' },
      },
      {
        id: '20',
        title: 'Estagiário de Desenvolvimento de Software',
        description: 'Estágio em desenvolvimento de software para sistemas governamentais. Trabalhe com tecnologias modernas como React, Node.js, Python e bancos de dados. Desenvolva soluções digitais para o setor público e aprenda sobre transformação digital.',
        company: 'Agência de Tecnologia da Informação',
        location: 'Remoto',
        type: 'estagio',
        area: 'Tecnologia',
        requirements: 'Cursando Ciência da Computação, Engenharia de Software ou áreas afins. Conhecimento em programação (JavaScript, Python ou Java), Git, interesse em desenvolvimento web',
        benefits: 'Remoto, horário flexível, mentoria técnica, ambiente inovador, vale refeição R$ 600, auxílio transporte',
        salary: 'R$ 1.200 - R$ 1.800',
        isRemote: true,
        isActive: true,
        createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000).toISOString(),
        user: { name: 'Agência de Tecnologia da Informação' },
      },
    ]
  }

  return (
    <div className="min-h-screen bg-dark-bg overflow-hidden">
      <Navbar />
      
      {/* Container principal com scroll snap estilo Reels */}
      <div className="h-[calc(100vh-4rem)] overflow-y-scroll snap-y snap-mandatory scroll-smooth pb-4">
        {loading ? (
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-border"></div>
              <p className="mt-4 text-gray-400">Carregando vagas...</p>
            </div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="h-screen flex items-center justify-center px-4">
            <div className="bg-dark-bgSecondary border border-dark-border rounded-2xl p-8 sm:p-12 text-center backdrop-blur-sm w-full max-w-md">
              <p className="text-gray-400 text-base sm:text-lg mb-4">
                Nenhuma vaga disponível no momento
              </p>
              <Link
                href="/vagas/nova"
                className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all font-bold text-sm sm:text-base"
              >
                Publicar Vaga
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Header fixo */}
            <div className="fixed top-16 sm:top-20 left-0 right-0 z-40 px-2 sm:px-4 flex justify-between items-center pointer-events-none">
              <div className="pointer-events-auto">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  💼 Vagas
                </h1>
              </div>
              <Link
                href="/vagas/nova"
                className="pointer-events-auto bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 transition-all font-bold text-xs sm:text-sm transform hover:scale-105 shadow-lg"
              >
                <span className="hidden sm:inline">+ Nova Vaga</span>
                <span className="sm:hidden">+</span>
              </Link>
            </div>

            {/* Feed de vagas */}
            <div className="space-y-0">
              {jobs.map((job) => (
                <div 
                  key={job.id} 
                  className="h-screen snap-start snap-always flex items-center justify-center px-2 sm:px-4 py-16 sm:py-20"
                >
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
