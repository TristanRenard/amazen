import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function getAllProducts() {
    try {
        const products = await prisma.item.findMany()
        return products
    } catch (error) {
        return error
    }
}