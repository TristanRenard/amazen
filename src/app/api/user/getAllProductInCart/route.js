import getAllProductsInCart from '@/utils/db/cart/getAllProductInCart'
import getAllProducts from '@/utils/db/product/getAllProducts'

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

/*
fetch('/api/user/getAllProductInCart', {
    method: 'POST',
    body: JSON.stringify({
        userid: 2,
    }),
})
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
*/
