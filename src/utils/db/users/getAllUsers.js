import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 *
 * @returns {Promise<Array>}
 */

export default async function getAllUsers() {
    try {
        const users = await prisma.user.findMany()

        if (users) {
            return users
        }

        return false
    } catch (error) {
        console.error(error)
        return false
    }
}
