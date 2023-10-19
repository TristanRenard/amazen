import insertUser from '@/utils/db/users/insertUser'
import emailIsAlreadyTaken from '@/utils/users/emailIsAlreadyTaken'

/**
 *
 * @param {Request} request
 * @returns {Promise<Response>}
 */

export async function POST(request) {
    const { register } = await request.json()

    if (!register) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Missing register object',
        })
    }

    const { username, password, email } = register

    if (!username || !password || !email) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Missing username, password or email',
        })
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    if (!passwordRegex.test(password)) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Invalid password',
        })
    }

    const emailRegex = /\S+@\S+\.\S+/

    if (!emailRegex.test(email)) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Invalid email',
        })
    }

    const usernameRegex = /^[a-zA-Z0-9]+$/

    if (!usernameRegex.test(username)) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Invalid username',
        })
    }

    const isTaken = await emailIsAlreadyTaken(email)

    if (isTaken) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Email already taken',
        })
    }

    try {
        await insertUser(username, password, email)

        return Response.json({
            message: 'User created',
            status: 200,
        })
    } catch (err) {
        return Response.json({
            err,
            status: 500,
        })
    }
}
