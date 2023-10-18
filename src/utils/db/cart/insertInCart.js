/*
model User {
    id       Int     @id @default(autoincrement())
    email    String  @unique
    name     String?
    password String
    orders   Order[]
    cart     Cart?
    admin    Boolean @default(false)
}

model Cart {
    id     Int    @id @default(autoincrement())
    user   User?  @relation(fields: [userId], references: [id])
    userId Int?   @unique
    items  Item[]
}

model Item {
    id          Int       @id @default(autoincrement())
    title       String
    description String
    price       Float
    imageUrl    String
    category    Category? @relation(fields: [categoryId], references: [id])
    categoryId  Int?
    cart        Cart?     @relation(fields: [cartId], references: [id])
    cartId      Int?
    order       Order?    @relation(fields: [orderId], references: [id])
    orderId     Int?
}
*/

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//add item in items in cart
export default async function insertItemInCart(userid, productid) {
    try {
        const cart = await prisma.cart.findFirst({
            where: {
                userId: userid,
            },
        })

        const item = await prisma.item.findFirst({
            where: {
                id: productid,
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
