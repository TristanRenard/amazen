import verifyToken from '@/utils/jwt/verifyToken'

export async function POST(req) {
    const { usertoken } = await req.json()

    if (!usertoken) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Missing usertoken object',
        })
    }

    //verify if usertoken is valid
    try {
        const decoded = await verifyToken(usertoken)
        if (decoded) {
            return Response.json({
                status: 200,
                user: decoded,
                usertoken,
            })
        } else
            return Response.json({
                status: 400,
                err: 'Bad Request: Invalid usertoken',
            })
    } catch (err) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Invalid usertoken',
        })
    }
}

/*
fetch('/api/jwt/verifyToken', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        usertoken: localStorage.getItem('token'),
    }),
})



*/
