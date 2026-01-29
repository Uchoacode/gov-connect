# Questões sobre Funcionalidades do Portal

## 1. Cadastro de Usuário - Limitação entre Criar e Explorar?

**Situação Atual:**
- No cadastro (`src/pages/Cadastro.tsx`), há dois tipos de usuário:
  - `consumer`: "Consumidor - Explorar conteúdo"
  - `publisher`: "Publicador - Criar e publicar conteúdo"
- No schema do Prisma, o campo é `userType` com valores `"consumer"` ou `"organizer"` (há uma inconsistência: no frontend usa `publisher`, no backend usa `organizer`)

**Problema Identificado:**
- A mesma pessoa NÃO pode fazer os dois. É uma escolha exclusiva no cadastro.
- No Navbar (`src/components/Navbar.tsx`), há um sistema de alternância entre "viewer" e "publisher", mas isso é apenas uma interface, não muda o tipo real do usuário.

**Recomendação:**
- Permitir que usuários do tipo `publisher` também possam explorar conteúdo (já podem, mas a interface pode confundir)
- Ou criar um terceiro tipo: `both` / `full` que permite criar e explorar
- Ou remover a limitação e permitir que todos possam criar e explorar

---

## 2. Perfil -> Website - O que é?

**Situação Atual:**
- No perfil (`src/pages/Perfil.tsx` linha 137-148), há um campo "Website" do tipo URL
- No schema do Prisma (`prisma/schema.prisma` linha 22), há o campo `website String?`
- É um campo opcional para o usuário informar seu site pessoal ou da organização

**Resposta:**
- É um campo para o usuário cadastrar o link do seu site pessoal, site da organização, portfólio, LinkedIn, etc.
- Exemplo: `https://meusite.com.br` ou `https://linkedin.com/in/usuario`

**Sugestão:**
- Adicionar um placeholder mais descritivo: "Site pessoal, LinkedIn, portfólio, etc."
- Ou dividir em campos separados: Website, LinkedIn, GitHub, etc.

---

## 3. Story - É story mesmo ou redireciona para perfil?

**Situação Atual:**
- O componente `StoriesBar` (`src/components/StoriesBar.tsx`) mostra stories estilo Instagram
- Ao clicar em um story, abre o `StoryViewer` (`src/components/StoryViewer.tsx`)
- O StoryViewer mostra slides com informações do usuário, mas NÃO redireciona para o perfil

**Resposta:**
- É um story mesmo (visualização estilo Instagram com slides)
- NÃO redireciona para o perfil atualmente

**Sugestão:**
- Adicionar um botão no StoryViewer para "Ver Perfil" que redireciona para `/perfil/:userId`
- Ou fazer o avatar/nome do usuário no story ser clicável e redirecionar para o perfil

---

## 4. Publicar - Só tem opção de vaga? Onde estão as vagas/eventos cadastrados?

**Situação Atual:**

**Opções de Publicação:**
- No Navbar (`src/components/Navbar.tsx` linha 245-254), quando o usuário está no modo "publisher", só aparece o botão "+ Nova Vaga"
- Existe a rota `/eventos/novo` (em `app/eventos/novo/page.tsx`), mas não há botão no Navbar para acessá-la
- Existe também a rota `/vagas/nova` (em `app/vagas/nova/page.tsx` e `src/pages/NovaVaga.tsx`)

**Onde estão as vagas/eventos cadastrados:**
- Na página de perfil (`app/perfil/page.tsx`), há tabs:
  - "Meus Eventos" - mostra eventos criados pelo usuário
  - "Minhas Vagas" - mostra vagas criadas (só aparece se `userType === 'organizer'`)
  - "Salvos" - eventos salvos pelo usuário
- Mas a página de perfil em `src/pages/Perfil.tsx` NÃO mostra essas tabs, só mostra o formulário de edição

**Problemas Identificados:**
1. Falta botão no Navbar para criar eventos
2. A página de perfil em React (`src/pages/Perfil.tsx`) não mostra as vagas/eventos cadastrados
3. Há duas páginas de perfil diferentes: uma em `app/perfil/page.tsx` (Next.js) e outra em `src/pages/Perfil.tsx` (React Router)

**Recomendações:**
1. Adicionar botão "+ Novo Evento" no Navbar quando o usuário for publisher
2. Unificar as páginas de perfil ou garantir que ambas mostrem as mesmas informações
3. Adicionar as tabs "Meus Eventos" e "Minhas Vagas" na página de perfil do React

---

## 5. Govers -> Perfil Usuário - Deve mostrar o quê?

**Situação Atual:**
- A página Govers (`src/pages/Govers.tsx`) lista todos os usuários do portal
- Os cards de usuário têm links para `/perfil/${u.id}` (linhas 267, 309)
- Mas NÃO existe uma rota `/perfil/:id` no `App.tsx` - só existe `/perfil` (perfil do próprio usuário)

**Problema:**
- Ao clicar em um usuário na página Govers, o link quebra porque a rota não existe
- Não há página para visualizar perfil público de outros usuários

**O que deveria mostrar:**
- Informações públicas do usuário:
  - Nome, avatar, bio
  - Organização, cargo, área de atuação
  - Website (se disponível)
  - Eventos públicos criados pelo usuário
  - Vagas públicas criadas pelo usuário
  - Estatísticas: seguidores, seguindo, eventos criados
  - Botão para seguir/seguir (se implementado)

**Recomendações:**
1. Criar rota `/perfil/:id` no `App.tsx`
2. Criar componente `PerfilPublico.tsx` que mostra o perfil de outro usuário
3. Diferenciar visualmente o perfil próprio (`/perfil`) do perfil público (`/perfil/:id`)
4. Na página de perfil próprio, mostrar botão "Editar Perfil"
5. Na página de perfil público, mostrar botão "Seguir" ou informações de relacionamento

---

## Resumo das Ações Necessárias

### Prioridade Alta:
1. ✅ **Criar rota `/perfil/:id`** para visualizar perfil de outros usuários
2. ✅ **Adicionar botão "+ Novo Evento"** no Navbar
3. ✅ **Unificar/Corrigir páginas de perfil** para mostrar vagas e eventos cadastrados
4. ✅ **Adicionar link no Story** para ver perfil do usuário

### Prioridade Média:
5. ✅ **Clarificar campo Website** no perfil (adicionar placeholder/descrição)
6. ✅ **Revisar sistema de tipos de usuário** (permitir criar e explorar simultaneamente)

### Prioridade Baixa:
7. ✅ **Adicionar mais campos sociais** no perfil (LinkedIn, GitHub, etc.)
