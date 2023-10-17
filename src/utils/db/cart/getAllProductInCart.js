import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function getAllProductsInCart() {
    try {
        const products = await prisma.cart.findMany({
            include: {
                items: true,
            },
        })
        return products
    } catch (error) {
        return error
    }
}
