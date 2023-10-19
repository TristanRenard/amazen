import getToken from '@/utils/users/getToken'

/**
 *
 * @param {Request} request
 * @returns {Promise<Response>}
 */
export async function POST(request) {
    const { login } = await request.json()

    if (!login) {
        return Response.json({
            err: 'Bad Request: Missing login object.',
            status: 400,
        })
    }

    const { password, email } = login

    if (!password || !email) {
        return Response.json({
            err: 'Bad Request: Missing password or email',
            status: 400,
        })
    }

    const emailRegex = /\S+@\S+\.\S+/

    if (!emailRegex.test(email)) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Invalid email',
        })
    }

    const isTaken = await emailIsAlreadyTaken(email)

    if (!isTaken) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Email not found',
        })
    }

    try {
        const usertoken = await getToken(email, password)
        if (usertoken) {
            return Response.json({
                status: 200,
                usertoken,
            })
        }
        return Response.json({
            status: 400,
            err: 'Bad Request: Invalid password',
        })
    } catch (err) {
        return Response.json({
            status: 500,
            err,
        })
    }
}
