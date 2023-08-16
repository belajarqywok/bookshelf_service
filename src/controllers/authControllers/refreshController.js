const refreshService = require('../../services/authServices/refreshService')


/**
 *  Refresh Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const refreshController = async (
    userRequest, userResponse
) => {

    try {
        const { refresh_token } = userRequest.payload

        const { 
            message, httpCode,
            accessToken, refreshToken
        } = await refreshService(refresh_token)

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

    } catch (errorMessage) {
        console.error(errorMessage)
        return userResponse.response({
            message: "Internal Server Error!.",
            http_code: 500,
        }).code(500)
    }

}



module.exports = refreshController