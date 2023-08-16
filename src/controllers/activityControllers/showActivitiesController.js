const showActivitiesService = require('../../services/activityServices/showActivitiesService')



/**
 *  Show Activities Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const showActivitiesController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization

        // Get Query Params
        const queryParams = {
            bookId: userRequest.query.bookId || undefined,
            readPage:
                isNaN(parseInt(userRequest.query.readPage)) ?
                undefined : parseInt(userRequest.query.readPage),

            finished:
                (userRequest.query.finished == "1") ? true  :
                (userRequest.query.finished == "0") ? false : undefined,

            reading:
                (userRequest.query.reading == "1") ? true  :
                (userRequest.query.reading == "0") ? false : undefined
        }
        
        // Show Activities Service
        const { 
            message, 
            httpCode, 
            activityData 
        } = await showActivitiesService(baererToken, queryParams)


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



module.exports = showActivitiesController