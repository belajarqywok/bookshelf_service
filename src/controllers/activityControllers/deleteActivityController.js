const deleteActivityService = require('../../services/activityServices/deleteActivityService')


/**
 *  Delete Activity Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const deleteActivityController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization

        // Get Activity ID In Params
        const activityId = userRequest.params.activityId
        
        // Delete Activity Service
        const { 
            message, 
            httpCode, 
            activityData 
        } = await deleteActivityService(
            baererToken, activityId
        )

        return userResponse.response({
            message: message,
            http_code: httpCode,
            data: activityData || null
        }).code(httpCode)


    } catch (errorMessage) {
        console.error(errorMessage)
        return userResponse.response({
            message: "Internal Server Error!.",
            http_code: 500,
            data: null
        }).code(500)
    }

}



module.exports = deleteActivityController