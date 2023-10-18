// import { getAllProductsInCart } from '@/utils/db/cart/getAllProductInCart'

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

/*
fetch('/api/user/addProductInCart', {
    method: 'POST',
    body: JSON.stringify({
        userid: 4,
        productid: 1,
    }),
})
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
*/
