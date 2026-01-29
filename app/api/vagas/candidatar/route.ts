import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      resume,
      coverLetter,
      jobId,
    } = body

    if (!name || !email || !resume || !jobId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: nome, email, currículo' },
        { status: 400 }
      )
    }

    const application = await prisma.jobApplication.create({
      data: {
        name,
        email,
        phone,
        resume,
        coverLetter,
        jobId,
        status: 'pending',
      },
    })

    return NextResponse.json(application, { status: 201 })
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json(
      { error: 'Erro ao enviar candidatura' },
      { status: 500 }
    )
  }
}
