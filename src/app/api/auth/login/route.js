import findUser from '@/utils/db/users/findUser'
import alredytaken from '@/utils/users/alredytaken'
import getToken from '@/utils/users/getToken'

export async function POST(request) {
    const { login } = await request.json()

    if (!login) {
        return Response.json({
            err: 'Bad Request: Missing login object ',
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

    //verify if email is valid
    const emailRegex = /\S+@\S+\.\S+/

    if (!emailRegex.test(email)) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Invalid email',
        })
    }

    //verify if email is already taken
    const isTaken = await alredytaken(email)

    if (!isTaken) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Email not found',
        })
    }

    try {
        const usertoken = await getToken(email, password)
        // console.log(usertoken)
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

/*
fetch('/api/auth/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        login : {
            password: 'Password1',
            email: 'emai@email.com',
        },
    }),
})
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
*/
