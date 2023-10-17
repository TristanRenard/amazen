/*
model Cart {
    id     Int    @id @default(autoincrement())
    user   User?  @relation(fields: [userId], references: [id])
    userId Int?   @unique
    items  Item[]
}
*/

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function createCart(userId) {
    const cart = await prisma.cart.create({
        data: {
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    })

    return cart
}
