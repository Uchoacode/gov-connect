import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const jobs = await prisma.jobPosting.findMany({
      where: {
        isActive: true,
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar vagas' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      title,
      description,
      company,
      location,
      type,
      area,
      requirements,
      benefits,
      salary,
      isRemote,
      applicationLink,
      userId,
    } = body

    if (!title || !description || !company || !userId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: título, descrição, empresa' },
        { status: 400 }
      )
    }

    const job = await prisma.jobPosting.create({
      data: {
        title,
        description,
        company,
        location,
        type: type || 'estagio',
        area,
        requirements,
        benefits,
        salary,
        isRemote: isRemote ?? false,
        applicationLink,
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    console.error('Error creating job:', error)
    return NextResponse.json(
      { error: 'Erro ao criar vaga' },
      { status: 500 }
    )
  }
}
