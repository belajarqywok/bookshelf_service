const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const showActivitiesRepository = require('../../repositories/activityRepositories/showActivitiesRepository')

 

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
 *  Show Activities Service
 * 
 *  @param {string} baererToken
 *  @returns 
 */
const showActivitiesService = async (baererToken, queryParams) => {
    try {

        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        // Show Activities Repo
        const showActivitiesRepo = await showActivitiesRepository(
            userId, queryParams
        )

        if (!showActivitiesRepo) {
            return response(
                'Show Activities Failed', 400, null
            )
        }

        return response(
            'Show Activities Success', 200, 
            showActivitiesRepo
        )

    } catch(errorMessage) {
        console.error(errorMessage)
        return response(
            'Show Activities Failed', 500, null
        )
    }
}



module.exports = showActivitiesService