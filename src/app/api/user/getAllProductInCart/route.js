import getAllProductsInCart from '@/utils/db/cart/getAllProductInCart'

export async function POST(request) {
    const { userid } = request.json()
    try {
        const products = await getAllProductsInCart(userid)
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
