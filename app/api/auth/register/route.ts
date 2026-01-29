import { NextResponse } from 'next/server'
import { createUser, getUserByEmail } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { name, email, password, userType } = await request.json()

    if (!name || !email || !password || !userType) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Verificar se o usuário já existe
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      )
    }

    // Criar usuário
    const user = await createUser(name, email, password, userType)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        avatar: user.avatar,
        bio: user.bio,
        organization: user.organization,
        website: user.website,
        area: user.area,
      },
      token: 'mock-token-' + user.id, // Em produção, usar JWT
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Erro ao criar conta' },
      { status: 500 }
    )
  }
}
