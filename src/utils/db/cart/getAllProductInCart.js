import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 *
 * @returns {Promise}
 */
export default async function getAllProductsInCart() {
    try {
        return await prisma.cart.findMany({
            include: {
                items: true,
            },
        })
    } catch (error) {
        return error
    }
}
