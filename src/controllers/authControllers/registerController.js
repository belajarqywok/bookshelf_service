const registerService = require('../../services/authServices/registerService')

 
/**
 *  Register Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const registerController = async (
    userRequest, userResponse
) => {

    const {fullname, email, password} = userRequest.payload

    const { message, httpCode } = await registerService({
        fullname, email, password
    })

    return userResponse.response({
        message: message,
        http_code: httpCode,
    }).code(httpCode)
    
}

module.exports = registerController