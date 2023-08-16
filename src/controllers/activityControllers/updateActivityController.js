const updateActivityService = require('../../services/activityServices/updateActivityService')


/**
 *  Update Activity Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const updateActivityController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization

        // Get Activity ID In Params
        const activityId = userRequest.params.activityId
        
        // Update Activity Service
        const { 
            message, 
            httpCode, 
            activityData 
        } = await updateActivityService(
            baererToken, activityId, {...userRequest.payload}
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



module.exports = updateActivityController