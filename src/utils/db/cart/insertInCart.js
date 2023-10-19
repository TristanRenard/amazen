import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 *
 * @param {string} userId
 * @param {string} productId
 * @returns
 */
export default async function insertItemInCart(userId, productId) {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                userId,
            },
        })

        const item = await prisma.item.findFirst({
            where: {
                id: productId,
            },
        })

        const cartItem = await prisma.cart.update({
            where: {
                id: cart.id,
            },
            data: {
                items: {
                    connect: {
                        id: item.id,
                    },
                },
            },
        })

        return cartItem
    } catch (error) {
        console.log(error)
        return error
    }
}
