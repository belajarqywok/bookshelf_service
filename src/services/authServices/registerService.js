const crypto = require('crypto')
const emailChecking = require('../../utilities/emailChecking')

const registerRepository = require('../../repositories/authRepositories/registerRepository')


/**
 *  Message Response
 * 
 *  @param {*} message 
 *  @param {*} response 
 *  @returns 
 */
const response = (message, httpCode) => {
    return { message, httpCode }
}



/**
 *  Register Service
 * 
 *  @param {*} userState 
 *  @returns 
 */
const registerService = async (userState) => {
    // User State Schema
    const { fullname, email, password } = userState

    try {
        // Check if the user with the given email already exists
        if (await emailChecking(email)) {
            return response(
                'Email already exists', 400
            )
        }

        // Hash the Password
        const hashedPassword = crypto.createHash('sha512')
            .update(password).digest('hex')

        // Create New User
        const registerRepo = await registerRepository(
            fullname, email, hashedPassword)

        if (!registerRepo) {
            return response(
                'Register Failed', 400
            )
        }

        return response(
            'Register Success', 201
        )

    } catch(errorMessage) {
        console.error(errorMessage)
        return response(
            'Register Failed', 500
        )
    }
}


module.exports = registerService