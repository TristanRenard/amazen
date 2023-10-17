import createCart from '@/utils/db/cart/createCart'
import insertUser from '@/utils/db/users/insertUser'
import alredytaken from '@/utils/users/alredytaken'

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

    //verify if password is valid
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

    if (!passwordRegex.test(password)) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Invalid password',
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

    //verify if username is valid
    const usernameRegex = /^[a-zA-Z0-9]+$/

    if (!usernameRegex.test(username)) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Invalid username',
        })
    }

    //verify if username is already taken
    const isTaken = await alredytaken(email)

    if (isTaken) {
        return Response.json({
            status: 400,
            err: 'Bad Request: Email already taken',
        })
    }

    //insert user in db
    try {
        const user = await insertUser(username, password, email)
        const cart = await createCart(user.id)

        return Response.json({
            message: 'User created',
            headers: {
                'Content-Type': 'application/json',
            },
            status: 200,
        })
    } catch (err) {
        return Response.json({
            err,
            headers: {
                'Content-Type': 'application/json',
            },
            status: 500,
        })
    }
}

/*
fetch('/api/auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        register: {
            username: 'username',
            password: 'Password1',
            email: 'emai@email.com',
        },
    }),
})
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err))
*/
