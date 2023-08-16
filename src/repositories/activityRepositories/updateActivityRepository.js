const databaseConfig = require('../../configurations/database')



/** 
 *  Update Activity Repository 
 * 
 *  @param {string} userId 
 *  @param {string} activityId 
 *  @param {object} activityData 
 */
const updateActivityRepository = async (userId, activityId, activityData) => {
    try {
        // Update Activity By User ID And Activity ID
        return await databaseConfig.activity
            .update({
                where: { 
                    id: activityId,
                    book: {
                        user: {
                            id: userId
                        }
                    }
                },
                data: {
                    readPage: activityData.readPage,
                    finished: activityData.finished,
                    reading: activityData.reading
                },
                select: { 
                    id: true,
                    bookId: true,
                    readPage: true,
                    finished: true,
                    reading: true
                }
            }) 

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}



module.exports = updateActivityRepository