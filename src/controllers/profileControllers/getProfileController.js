const getProfileService = require('../../services/profileServices/getProfileService')



/**
 *  Profile Controller
 * 
 *  @param {*} _userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const getProfileController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization

        // Get Profile Service
        const {
            message, httpCode,
            fullname, email
        } = await getProfileService(baererToken)

        if (fullname == null && email == null) {
            return userResponse.response({
                message,
                http_code: httpCode,
            }).code(httpCode)
        }

        return userResponse.response({
            message,
            http_code: httpCode,
            data: {
                email: email,
                fullname: fullname
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



module.exports = getProfileController