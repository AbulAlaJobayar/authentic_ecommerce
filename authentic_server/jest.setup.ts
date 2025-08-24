import prisma from './src/app/shared/prisma'

afterAll(async () => {
  await prisma.$disconnect()
})