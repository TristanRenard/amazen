import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default async function getProduct(id) {
    const product = await prisma.item.findFirst({
        where: {
            id,
        },
    })

    if (product) {
        return product
    }

    return false
}
