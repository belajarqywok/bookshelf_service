const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const updateActivityRepository = require('../../repositories/activityRepositories/updateActivityRepository')


 
/**
 *  Message Response
 * 
 *  @param {string} message 
 *  @param {int} httpCode
 *  @param {*} activityData
 *  @returns 
 */
const response = (message, httpCode, activityData) => {
    return { message, httpCode, activityData }
}



/**
 *  Update Activity Service
 * 
 *  @param {string} baererToken
 *  @param {string} activityId
 *  @param {object} payload
 *  @returns 
 */
const updateActivityService = async (baererToken, activityId, payload) => {
    try {

        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        const activityData = {
            readPage: payload.read_page,
            finished: payload.finished,
            reading: payload.reading
        }

        // Update Activity Repo
        const updateActivityRepo = await updateActivityRepository(
            userId, activityId, {...activityData}
        )

        if (!updateActivityRepo) {
            return response(
                'Update Activity Failed', 400, null
            )
        }

        return response(
            'Update Activity Success', 201,
            {...updateActivityRepo}
        )

    } catch(errorMessage) {
        console.error(errorMessage)
        return response(
            'Update Activity Failed', 500, null
        )
    }
}



module.exports = updateActivityService