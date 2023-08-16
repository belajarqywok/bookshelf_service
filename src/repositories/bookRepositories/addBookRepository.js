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
 *  Add Book Repository
 * 
 *  @param {string} userId
 *  @param {object} bookDatas
 */
const addBookRepository = async (userId, bookDatas) => {
    try {

        // Add Book
        const addBook = await databaseConfig.book.create({
            data: { 
                userId,
                ...bookDatas
            }
        })


        // Count Book
        const countBook = await databaseConfig.book.count({
            where: { 
                user: { id: userId }
            }
        })

        if (countBook > 20) {
            return addBook
        }


        // Get Books Data
        const books = await getBooks(userId)

        // Book Caching Key
        const bookCachingKey = `${KEYS.books}::${userId}`

        // Caching Book Data
        await cachingConfig.setex(
            bookCachingKey, 600, 
            JSON.stringify(books)
        )

        return addBook

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}



module.exports = addBookRepository