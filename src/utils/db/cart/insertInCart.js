import getAllProductsInCart from '@/utils/db/cart/getAllProductInCart'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function insertInCart(token, productid) {
    try {
        //array of product ids
        let products = await getAllProductsInCart(userid)

        //check if product is already in cart
        if (products.includes(productid)) {
            return { error: 'Product is already in cart ' }
        }

        const newCart = await prisma.cart.update({
            where: {
                userId: userid,
            },
            data: {
                items: {
                    connect: {
                        id: productid,
                    },
                },
            },
        })

        //add product to cart
        products += [productid]
        return products
    } catch (error) {
        return error
    }
}
