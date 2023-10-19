import insertItemInCart from '@/utils/db/cart/insertInCart'

export async function POST(request) {
    const { userid, productid } = request.json()
    try {
        const products = await insertItemInCart(userid, productid)
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
