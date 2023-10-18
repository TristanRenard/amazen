import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function getAllProductsInCart(userid) {
    try {
        const products = await prisma.cart.findFirst({
            where: {
                userId: userid,
            },
            include: {
                items: true,
            },
        })
        return products.items
    } catch (error) {
        return error
    }
}
