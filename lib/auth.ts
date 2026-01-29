import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createUser(name: string, email: string, password: string, userType: 'organizer' | 'consumer') {
  const hashedPassword = await hashPassword(password)
  return prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      userType,
    },
    select: {
      id: true,
      name: true,
      email: true,
      userType: true,
      avatar: true,
      bio: true,
      organization: true,
      website: true,
      area: true,
      createdAt: true,
    },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}
