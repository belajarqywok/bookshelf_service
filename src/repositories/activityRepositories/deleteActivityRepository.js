const databaseConfig = require('../../configurations/database')


/**
 *  Delete Activity Repository
 * 
 *  @param {string} userId 
 *  @param {string} activityId 
 *  @returns 
 */
const deleteActivityRepository = async (userId, activityId) => {
    
    try {

        // Get Book ID
        const { bookId } = await databaseConfig.activity.findUnique({
            where: {
                id: activityId,
                book: {
                    user: {
                        id: userId
                    }
                }
            },
            select: {
                bookId: true
            }
        })

        return await databaseConfig.$transaction([

            // Delete Reader Activity
            databaseConfig.activity.delete({
                where: { 
                    id: activityId, 
                    book : {
                        id: bookId,
                        user: {
                            id: userId
                        }
                    }
                }
            }),
    
            // Update Book Stock
            databaseConfig.book.update({
                where: { 
                    id: bookId, 
                    user: {
                        id: userId
                    } 
                },
                data: {
                    stock: { 
                        increment: 1 
                    }
                }
            })
        ])

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }

}



module.exports = deleteActivityRepository