const authConfig = require('../../configurations/auth')
const getUserIdToken = require('../../utilities/getUserIdToken')
const refreshRepository = require('../../repositories/authRepositories/refreshRepository')


/**
 *  Message Response
 * 
 *  @param {*} message 
 *  @param {*} httpCode 
 *  @param {*} accessToken 
 *  @param {*} refreshToken 
 *  @returns 
 */
const response = (message, httpCode, accessToken, refreshToken) => {
    return { message, httpCode, accessToken, refreshToken }
}



/**
 *  Refresh Service
 * 
 *  @param {*} refreshToken 
 */
const refreshService = async (refreshToken) => {
    try {
        // Get User ID in Token
        const userId = await getUserIdToken(refreshToken)

        // Validate User ID
        const userIdIsValid = await refreshRepository(userId)

        if (!userIdIsValid) {
            return response(
                "User ID Payload invalid!.", 401,
                null, null
            )
        }

        return response(
            "token updated successfully", 200,

            // Access Token
            await authConfig.generateAccessToken(userId),

            // Refresh Token
            await authConfig.generateRefreshToken(userId)
        )

    } catch (errorMessage) {
        console.error(errorMessage)
        return response(
            "Internal Server Error!.", 500,
            null, null
        )
    }
}


module.exports = refreshService