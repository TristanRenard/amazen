import insertProduct from '@/utils/db/product/insertProduct'

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
            data: newProduct,
        })
    } catch (err) {
        return Response.json({
            status: 500,
            err,
        })
    }
}
