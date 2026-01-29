import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const modality = searchParams.get('modality')
    const isFree = searchParams.get('isFree')
    const area = searchParams.get('area')

    const where: any = {
      isPublic: true,
    }

    if (search) {
      // SQLite não suporta mode: 'insensitive', então buscamos normalmente
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { organizer: { contains: search } },
        { area: { contains: search } },
      ]
    }

    if (modality) {
      where.modality = modality
    }

    if (isFree !== null && isFree !== '') {
      where.isFree = isFree === 'true'
    }

    if (area) {
      where.area = area
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
            userType: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar eventos' },
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
      image,
      banner,
      location,
      date,
      time,
      organizer,
      organizerId,
      category,
      area,
      modality,
      isFree,
      price,
      registrationLink,
      targetAudience,
      certification,
      program,
      userId,
    } = body

    if (!title || !description || !date || !organizer || !userId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: título, descrição, data, organizador' },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        image,
        banner,
        location,
        date: new Date(date),
        time,
        organizer,
        organizerId: organizerId || userId,
        category,
        area,
        modality: modality || 'presencial',
        isFree: isFree ?? true,
        price,
        registrationLink,
        targetAudience,
        certification: certification ?? false,
        program,
        userId,
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
            userType: true,
          },
        },
      },
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Erro ao criar evento' },
      { status: 500 }
    )
  }
}
