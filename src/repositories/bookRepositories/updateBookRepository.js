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
 *  Update Book Repository 
 * 
 *  @param {string} userId 
 *  @param {string} bookId 
 *  @param {object} bookData 
 */
const updateBookRepository = async (userId, bookId, bookData) => {
    try {
        // Update Book By User ID And Book ID
        const updateBook = await databaseConfig.book
            .update({
                where: { id: bookId, userId },
                data: {
                    name: bookData.name,
                    year: bookData.year,
                    author: bookData.author,
                    summary: bookData.summary,
                    publisher: bookData.publisher,
                    pageCount: bookData.pageCount,
                    stock: bookData.stock
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
                }
            })

        // Get Books Data
        const books = await getBooks(userId)

        // Caching Validation
        const booksValidation = books.find(
            (booksData) => booksData.id === updateBook.id)

        // Book Caching Key
        const bookCachingKey = `${KEYS.books}::${userId}`

        // Caching If Update Data Exist In Activities Data
        if (booksValidation && JSON.stringify(books) != '[]') {
            await cachingConfig.setex(
                bookCachingKey, 600, 
                JSON.stringify(books)
            )
        }

        return updateBook

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}



module.exports = updateBookRepository