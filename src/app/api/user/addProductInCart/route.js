import insertInCart from '@/utils/db/cart/insertInCart'
import verifyToken from '@/utils/jwt/verifyToken'

export async function POST(request) {
    try {
        const { token, productid } = await request.json()
        const { id } = await verifyToken(token)
        const products = await insertInCart(id, productid)
        return Response.json({
            status: 200,
            products,
            id,
        })
    } catch (err) {
        return Response.json({
            status: 500,
            err: err.message,
        })
    }
}
