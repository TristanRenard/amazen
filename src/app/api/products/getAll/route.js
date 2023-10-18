import getAllProducts from '@/utils/db/product/getAllProducts'

export async function GET() {
    try {
        const products = await getAllProducts()
        return Response.json({
            status: 200,
            productd: products,
        })
    } catch (err) {
        return Response.json({
            status: 500,
            err: err.message,
        })
    }
}
