const loginService = require('../../services/authServices/loginService')


/**
 *  Login Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const loginController = async (
    userRequest, userResponse
) => {
    
    // Get User Credentials In Payload
    const { email, password } = userRequest.payload

    const { message, httpCode, accessToken, refreshToken } = await loginService(
        email, password
    )

    if (accessToken == null && refreshToken == null) {
        return userResponse.response({
            message,
            http_code: httpCode,
        }).code(httpCode)
    }

    return userResponse.response({
        message,
        http_code: httpCode,
        data: {
            access_token:  accessToken,
            refresh_token: refreshToken
        }
    }).code(httpCode)
    
}



module.exports = loginController