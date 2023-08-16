const showDetailActivityService = require('../../services/activityServices/showDetailActivityService')



/**
 *  Show Detail Activity Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const showDetailActivityController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization

        // Get Activity ID In Params
        const activityId = userRequest.params.activityId
        
        // Show Detail Activity Service
        const { 
            message, 
            httpCode, 
            activityData 
        } = await showDetailActivityService(
            baererToken, activityId
        )


        if (activityData == null) {
            return userResponse.response({
                message: message,
                http_code: httpCode,
                data: activityData
            }).code(httpCode)
        }

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



module.exports = showDetailActivityController