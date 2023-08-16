const deleteProfileService = require('../../services/profileServices/deleteProfileService')



/**
 *  Delete Profile Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const deleteProfileController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization

        // Delete Profile Service
        const deleteProfileSvc = await deleteProfileService(baererToken)

        // Response
        return userResponse.response({
            message: deleteProfileSvc.message,
            http_code: deleteProfileSvc.httpCode
        }).code(deleteProfileSvc.httpCode)
        
    } catch (errorMessage) {
        console.error(errorMessage)
        return userResponse.response({
            message: "Internal Server Error!.",
            http_code: 500,
        }).code(500)
    }

}



module.exports = deleteProfileController