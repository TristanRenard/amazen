export async function POST(req) {
    const { usertoken } = await req.json()

    const jwt = require('jsonwebtoken')

    if (!usertoken) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Missing usertoken object',
        })
    }

    //verify if usertoken is valid
    try {
        const decoded = jwt.verify(usertoken, process.env.JWT_SECRET)
        if (decoded) {
            return Response.json({
                status: 200,
                decoded,
            })
        }
    } catch (err) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Invalid usertoken',
        })
    }
    return Response.json({
        status: 400,
        err: 'Bad Request: Invalid usertoken',
    })
}
