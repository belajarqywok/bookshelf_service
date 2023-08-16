const crypto = require('crypto')
const authConfig = require('../../configurations/auth')
const loginRepository = require('../../repositories/authRepositories/loginRepository')



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
 *  Login Service
 * 
 *  @param {*} userState 
 */
const loginService = async (email, password) => {
    try {

        // Hash the Password
        const hashedPassword = crypto.createHash('sha512')
            .update(password).digest('hex')

        // Validate User Credentials
        const credsIsValid = await loginRepository(
            email, hashedPassword
        )

        // If Credentials Isn't valid
        if (!credsIsValid) {
            return response(
                "Invalid Credentials", 401,
                null, null
            )
        }


        return response(
            "Login Success", 200,

            // Access Token
            await authConfig.generateAccessToken(credsIsValid.id),

            // Refresh Token
            await authConfig.generateRefreshToken(credsIsValid.id)
        )
        
        
    } catch (errorMessage) {
        console.error(errorMessage)
        return response(
            "Internal Server Error!.", 500,
            null, null
        )
    }
}



module.exports = loginService