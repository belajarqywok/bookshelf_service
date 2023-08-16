const updateProfileService = require('../../services/profileServices/updateProfileService')



/**
 *  Update Profile Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const updateProfileController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization

        // Get User Profile Datas In Payload
        const { fullname, email } = userRequest.payload

        const updateProfileSvc = await updateProfileService(
            baererToken, fullname, email
        )

        if (updateProfileSvc.fullname == null && updateProfileSvc.email == null) {
            return userResponse.response({
                message: updateProfileSvc.message,
                http_code: updateProfileSvc.httpCode,
            }).code(updateProfileSvc.httpCode)
        }

        return userResponse.response({
            message: updateProfileSvc.message,
            http_code: updateProfileSvc.httpCode,
            data: {
                email: updateProfileSvc.email,
                fullname: updateProfileSvc.fullname
            }
        }).code(updateProfileSvc.httpCode)
        
    } catch (errorMessage) {
        console.error(errorMessage)
        return userResponse.response({
            message: "Internal Server Error!.",
            http_code: 500,
        }).code(500)
    }

}



module.exports = updateProfileController