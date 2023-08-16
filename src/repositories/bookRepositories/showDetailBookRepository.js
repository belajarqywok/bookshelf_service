const databaseConfig = require('../../configurations/database')



/**
 *  Show Detail Book Repository
 * 
 *  @param {string} userId 
 *  @param {string} bookId 
 */
const showDetailBookRepository = async (userId, bookId) => {
    try {
        // Get Books By Book ID and User ID
        return await databaseConfig.book
            .findUnique({
                where: { id: bookId, userId },
                select: { 
                    id: true, 
                    name: true,
                    year: true,
                    author: true,
                    summary: true,
                    publisher: true,
                    pageCount: true,
                    stock: true,
                    insertedAt: true,
                    updatedAt: true
                }
            })

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}



module.exports = showDetailBookRepository