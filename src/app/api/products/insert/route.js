import insertProduct from '@/utils/db/product/insertProduct'
//const jwt = require("jsonwebtoken");

export async function POST(request) {
    const { product } = await request.json()

    if (!product) {
        return Response.json({
            err: 'Bad Request: Missing product object',
            product: product,
            status: 400,
        })
    }

    const { title, price, description, image } = product

    if (!title || !price || !description || !image) {
        return Response.json({
            err: 'Bad Request: Missing title, price, description or image',
            status: 400,
        })
    }

    try {
        const newProduct = await insertProduct(title, price, description, image)
        return Response.json({
            status: 200,
        })
    } catch (err) {
        return Response.json({
            status: 500,
            err,
        })
    }
}
/*
fetch('/api/products/insert', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        product: {
            title: 'test',
            price: 10,
            description: 'test',
            image: 'test',
        },
    }),
})
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
*/
