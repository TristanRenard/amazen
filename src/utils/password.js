import bcrypt from 'bcryptjs'

/**
 * @param {string} password
 * @returns {Promise<string>}
 */

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

/**
 *
 * @param {string} hash
 * @param {string} password
 * @returns {Promise<boolean>}
 */

const validatePassword = async (hash, password) => {
    const compare = await bcrypt.compare(password, hash)
    return compare
}

export { hashPassword, validatePassword }
