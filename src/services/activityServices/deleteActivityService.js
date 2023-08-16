const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const deleteActivityRepository = require('../../repositories/activityRepositories/deleteActivityRepository')


 
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
 *  Delete Activity Service
 * 
 *  @param {string} baererToken
 *  @param {string} activityId
 *  @returns 
 */
const deleteActivityService = async (baererToken, activityId) => {
    try {

        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        // Delete Activity Repo
        const deleteActivityRepo = await deleteActivityRepository(
            userId, activityId
        )

        if (!deleteActivityRepo) {
            return response(
                'Delete Activity Failed', 400, null
            )
        }

        return response(
            'Delete Activity Success', 200, null
        )

    } catch(errorMessage) {
        console.error(errorMessage)
        return response(
            'Delete Activity Failed', 500, null
        )
    }
}



module.exports = deleteActivityService