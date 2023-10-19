import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
/**
 *
 * @param {string} email
 * @returns {Promise<boolean>}
 */
export default async function emailIsAlreadyTaken(email) {
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    })

    if (user) {
        return true
    }

    return false
}
