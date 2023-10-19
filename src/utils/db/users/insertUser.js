import { hashPassword } from '@/utils/password'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 *
 * @param {string} username
 * @param {string} password
 * @param {string} email
 * @returns
 */

export default async function insertUser(username, password, email) {
    const hash = await hashPassword(password)
    const user = await prisma.user.create({
        data: {
            name: username,
            password: hash,
            email,
            cart: { create: {} },
        },
        include: {
            cart: true,
        },
    })

    return user
}
