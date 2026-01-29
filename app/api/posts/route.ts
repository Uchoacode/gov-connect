import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
            organization: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { content, image, isInstitutional, userId } = body

    if (!content || !userId) {
      return NextResponse.json(
        { error: 'Conteúdo e usuário são obrigatórios' },
        { status: 400 }
      )
    }

    const post = await prisma.post.create({
      data: {
        content,
        image,
        isInstitutional: isInstitutional ?? true,
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
            organization: true,
          },
        },
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Erro ao criar post' },
      { status: 500 }
    )
  }
}
