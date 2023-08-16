const jwt = require('jsonwebtoken')
const HapiJwt = require('hapi-auth-jwt2')
const databaseConfig = require('./database')

require('dotenv').config()


/**
 *  Generate Access Token
 * 
 *  @param {*} payload 
 *  @returns 
 */
 const generateAccessToken = async (payload) => {

    return jwt.sign({ id: payload }, process.env.SECRET_KEY, {
        expiresIn: (
            // 1 days (default)
            parseInt(process.env.ACCESS_TOKEN_EXPIRATION) || 1 
        ) * 60 * 1000,
        algorithm: process.env.JWT_ALGORITHM,
    }) 

}



/**
 *  Generate Refresh Token
 * 
 *  @param {*} payload 
 *  @returns 
 */
 const generateRefreshToken = async (payload) => {

    return jwt.sign({ id: payload }, process.env.SECRET_KEY, {
        expiresIn: (
            // 3 days (default)
            parseInt(process.env.REFRESH_TOKEN_EXPIRATION) || 3 
        ) * 24 * 60 * 1000,
        algorithm: process.env.JWT_ALGORITHM,
    }) 

}



/**
 *  Validate User By Id
 * 
 *  @param {*} decoded 
 *  @returns 
 */
const validateUserById = async (decoded) => {
    const userId = decoded.id

    // Get Existing User ID
    const existingUserId = databaseConfig.user
        .findUnique({
            where: { id: userId },
        })

    if (!existingUserId) {
        return { isValid: false }
    }

    return { isValid: true }
}
 


/**
 *  Auth Configuration
 * 
 *  @param {*} service 
 */
const authConfiguration = async (service) => {
    // Register Hapi JWT Plugin
    await service.register(HapiJwt)

    // Register an Authentication Strategy
    service.auth.strategy('jwt', 'jwt', {
        key: process.env.SECRET_KEY,
        validate: validateUserById,
        verifyOptions: { 
            algorithms: [process.env.JWT_ALGORITHM] 
        }
    })

      // Sets a Default Strategy Which is Applied to Every Route
      service.auth.default('jwt')
}



module.exports = {
    // Auth Configuration
    authConfiguration,

    // Generate Access Token
    generateAccessToken,

    // Generate Refresh Token
    generateRefreshToken
}