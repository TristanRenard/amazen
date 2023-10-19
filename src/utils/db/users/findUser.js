import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
/**
 *
 * @param {string} email
 * @returns {Promise}
 */
export default async function findUser(email) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email,
            },
        })

        if (user) {
            return user
        }

        return false
    } catch (error) {
        console.error(error)
        return false
    }
}
