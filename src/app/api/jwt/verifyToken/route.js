import jwt from 'jsonwebtoken'

/**
 *
 * @param {Request} req
 * @returns {Promise<Request>}
 */
export async function POST(req) {
    const { usertoken } = await req.json()

    if (!usertoken) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Missing usertoken object',
        })
    }

    try {
        const decoded = jwt.verify(usertoken, process.env.JWT_SECRET)
        if (decoded) {
            return Response.json({
                status: 200,
                decoded,
            })
        }
    } catch (err) {
        console.error(err)
        return Response.json({
            status: 400,
            err: 'Bad Request: Invalid usertoken',
        })
    }
}
