const databaseConfig = require('../../configurations/database')


 
/**
 *  Add Activity Repository
 * 
 *  @param {object} activityData
 */
const addActivityRepository = async (userId, activityData) => {
    try {

        // Get current Book Stock
        const currentStock = await databaseConfig.book.findUnique({
            where: { id: activityData.bookId, userId },
            select: { stock: true },
        })

        if (currentStock.stock <= 0 || currentStock == null) { 
            return false
        }

        // Create Reader Activity Transaction
        return await databaseConfig.$transaction([

            // Create Reader Activity
            databaseConfig.activity.create({
                data: {
                    userId,
                    bookId: activityData.bookId,
                    readPage: activityData.readPage,
                    finished: activityData.finished,
                    reading: activityData.reading,
                }
            }),
    
            // Update Book Stock
            databaseConfig.book.update({
                where: { id: activityData.bookId, userId },
                data: {
                    stock: { 
                        decrement: 1 
                    }, 
                }
            })
        ])


    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}



module.exports = addActivityRepository