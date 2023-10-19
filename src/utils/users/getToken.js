import jwt from 'jsonwebtoken'
import findUser from '../db/users/findUser'
import { validatePassword } from '../password'

/**
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<string>}
 */
export default async function getToken(email, password) {
    const user = await findUser(email)

    if (user) {
        const isValid = await validatePassword(user.password, password)

        if (isValid) {
            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    admin: user.admin,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                }
            )
            return token
        }
    }
}
