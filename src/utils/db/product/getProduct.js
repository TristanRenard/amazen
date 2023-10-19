import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 *
 * @param {string} id
 * @returns
 */

export default async function getProduct(id) {
    try {
        const product = await prisma.item.findFirst({
            where: {
                id,
            },
        })

        if (product) {
            return product
        }

        return false
    } catch (error) {
        console.error(error)
        return false
    }
}
