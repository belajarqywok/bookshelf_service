const databaseConfig = require('../../configurations/database')
const { cachingConfig, KEYS } = require('../../configurations/caching')



/**
 *  Get Books
 * 
 *  @param {*} userId 
 *  @param {*} queryParams 
 *  @returns 
 */
 const getBooks = async (userId) => {
    try {
        // Get Books By User ID and Query Params
        return await databaseConfig.book
            .findMany({
                where: { 
                    user: { id: userId }
                },
                select: { 
                    id: true, 
                    name: true,
                    year: true,
                    author: true,
                    summary: true,
                    publisher: true,
                    pageCount: true,
                    stock: true
                },
                take: 20
            })

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}



/**
 *  Delete Book Repository
 * 
 *  @param {*} userId
 *  @returns 
 */
const deleteBookRepository = async (userId, bookId) => {
    
    try {
        // Get User Book Data By User ID and Book ID
        const getBook = await databaseConfig.book
            .findUnique({
                where: { id: bookId, userId }
            })

        // Get Books Data
        const books = await getBooks(userId)


        // Delete User Book Data By User ID and Book ID
        const deleteBook = await databaseConfig.book
            .delete({
                where: { id: bookId, userId }
            })


        // Caching Validation
        const booksValidation = books.find(
            (booksData) => booksData.id === getBook.id)

        // Book Caching Key
        const bookCachingKey = `${KEYS.books}::${userId}`

        // Caching If Update Data Exist In Activities Data
        if (booksValidation && JSON.stringify(books) != '[]') {
            await cachingConfig.setex(
                bookCachingKey, 600, 
                JSON.stringify(books)
            )
        }

        return deleteBook


    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }

}



module.exports = deleteBookRepository