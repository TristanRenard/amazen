import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function insertProduct(
    title,
    price,
    description,
    imageUrl
) {
    try {
        const product = await prisma.Item.create({
            data: {
                title,
                price,
                description,
                imageUrl,
            },
        })

        return product
    } catch (error) {
        console.log(error)
    }
}
