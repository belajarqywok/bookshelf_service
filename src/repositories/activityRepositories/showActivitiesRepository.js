const { cachingConfig, KEYS } = require('../../configurations/caching')
const databaseConfig = require('../../configurations/database')



/**
 *  Get Activities
 * 
 *  @param {*} userId 
 *  @param {*} queryParams 
 *  @returns 
 */
const getActivities = async (userId, queryParams) => {
    try {
        

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}
 


/**
 *  Show Activities Repository
 * 
 *  @param {string} userId
 */
const showActivitiesRepository = async (userId, queryParams) => {
    try {
    
        // Get Activities By User ID and Query Params
        return await databaseConfig.activity
            .findMany({
                where: {
                    book: {
                        id: queryParams.bookId,
                        userId: userId,
                    },
                    readPage: queryParams.readPage,
                    finished: queryParams.finished,
                    reading: queryParams.reading
                },
                select: { 
                    id: true,
                    bookId: true,
                    readPage: true,
                    finished: true,
                    reading: true
                },
                take: 20
            })

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}



module.exports = showActivitiesRepository