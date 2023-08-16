const addActivityService = require('../../services/activityServices/addActivityService')


/**
 *  Add Activity Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const addActivityController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization
        
        // Add Activity Service
        const { message, httpCode, activityData } = await addActivityService(
            baererToken, {...userRequest.payload}
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
            data: {...activityData}
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



module.exports = addActivityController