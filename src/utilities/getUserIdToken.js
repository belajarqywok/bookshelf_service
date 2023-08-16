const jwt = require('jsonwebtoken')
require('dotenv').config()



/**
 *  Get User ID in Token
 * 
 *  @param {*} token 
 */
const getUserIdToken = async (token) => {
    try {
        // Get Payload
        const jwtPayload = jwt.verify(
            token, process.env.SECRET_KEY, { 
                algorithms: [process.env.JWT_ALGORITHM] 
            }
        )

        return jwtPayload.id

    } catch (errorMessage) {
        console.error(errorMessage)
        return undefined
    }
}



module.exports = getUserIdToken