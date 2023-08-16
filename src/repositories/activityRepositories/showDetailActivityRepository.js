const databaseConfig = require('../../configurations/database')

 

/**
 *  Show Detail Activity Repository
 * 
 *  @param {string} userId
 */
const showDetailActivityRepository = async (userId, activityId) => {
    try {
        // Get Activities By Activity ID and User ID in Book Relation
        return await databaseConfig.activity
            .findUnique({
                where: {
                    id: activityId,
                    book: {
                        user: {
                            id: userId
                        }
                    }
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



module.exports = showDetailActivityRepository