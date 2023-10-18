import insertInCart from '@/utils/db/cart/insertInCart'

export async function POST(request) {
    try {
        const { userid, productid } = await request.json()
        const products = await insertInCart(userid, productid)
        return Response.json({
            status: 200,
            products,
        })
    } catch (err) {
        return Response.json({
            status: 500,
            err: err.message,
        })
    }
}
