import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 *
 * @returns {Promise}
 */
export default async function getAllProducts() {
    try {
        return await prisma.item.findMany()
    } catch (error) {
        console.error(error)
        return []
    }
}
