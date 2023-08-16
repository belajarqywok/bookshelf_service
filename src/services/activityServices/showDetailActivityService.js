const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const showDetailActivityRepository = require('../../repositories/activityRepositories/showDetailActivityRepository')



/**
 *  Message Response
 * 
 *  @param {string} message 
 *  @param {int} httpCode
 *  @param {array} activityData
 *  @returns 
 */
const response = (message, httpCode, activityData) => {
    return { message, httpCode, activityData }
}



/**
 *  Show Detail Activity Service
 * 
 *  @param {string} baererToken
 *  @param {string} activityId
 *  @returns 
 */
const showDetailActivityService = async (baererToken, activityId) => {
    try {

        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        // Show Detail Activity Repo
        const showDetailActivityRepo = await showDetailActivityRepository(
            userId, activityId
        )

        if (!showDetailActivityRepo) {
            return response(
                'Show Activity Failed', 400, null
            )
        }

        return response(
            'Show Activity Success', 200, 
            {...showDetailActivityRepo}
        )

    } catch(errorMessage) {
        console.error(errorMessage)
        return response(
            'Show Activity Failed', 500, null
        )
    }
}



module.exports = showDetailActivityService