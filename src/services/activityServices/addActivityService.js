const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const addActivityRepository = require('../../repositories/activityRepositories/addActivityRepository')



/**
 *  Message Response
 * 
 *  @param {string} message 
 *  @param {int} httpCode
 *  @param {*} bookData
 *  @returns 
 */
const response = (message, httpCode, activityData) => {
    return { message, httpCode, activityData }
}



/**
 *  Add Activity Service
 * 
 *  @param {string} baererToken
 *  @param {object} payload
 *  @returns 
 */
const addActivityService = async (baererToken, payload) => {
    try {

        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        // Activity Data
        const activityData = {
            bookId: payload.book_id,
            readPage: payload.read_page,
            finished: payload.finished,
            reading: payload.reading
        }

        // Add Activity Repo
        const addActivityRepo = await addActivityRepository(
            userId, activityData
        )

        if (!addActivityRepo) {
            return response(
                'Add Activity Failed', 400, null
            )
        }

        return response(
            'Add Activity Success', 201, 
            {...addActivityRepo[0]}
        )

    } catch(errorMessage) {
        console.error(errorMessage)
        return response(
            'Add Activity Failed', 500, null
        )
    }
}



module.exports = addActivityService