const updatePasswordService = require('../../services/authServices/updatePasswordService')



/**
 *  Update Password Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const updatePasswordController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization

        // Get User Profile Datas In Payload
        const { password } = userRequest.payload

        const updatePasswordSvc = await updatePasswordService(
            baererToken, password
        )

        return userResponse.response({
            message: updatePasswordSvc.message,
            http_code: updatePasswordSvc.httpCode
        }).code(updatePasswordSvc.httpCode)
        
    } catch (errorMessage) {
        console.error(errorMessage)
        return userResponse.response({
            message: "Internal Server Error!.",
            http_code: 500,
        }).code(500)
    }

}



module.exports = updatePasswordController