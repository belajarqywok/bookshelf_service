const { cachingConfig, KEYS } = require('../../configurations/caching')
const databaseConfig = require('../../configurations/database')


/**
 *  Get Books
 * 
 *  @param {*} userId 
 *  @param {*} queryParams 
 *  @returns 
 */
const getBooks = async (userId, queryParams) => {
    try {
        // Get Books By User ID and Query Params
        return await databaseConfig.book
            .findMany({
                where: { 
                    user: { id: userId },
                    name: { contains: queryParams.name },
                    year: queryParams.year,
                    author: { contains: queryParams.author },
                    publisher: { contains: queryParams.publisher },
                    pageCount: queryParams.pageCount,
                    stock: queryParams.stock
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
 *  Show Books Repository
 * 
 *  @param {string} userId 
 *  @param {object} queryParams 
 */
const showBooksRepository = async (userId, queryParams) => {
    try {
        // Caching Validation
        if ( 
            queryParams.name == undefined && queryParams.year == undefined &&
            queryParams.author == undefined && queryParams.publisher == undefined &&
            queryParams.pageCount == undefined && queryParams.stock == undefined
        ) {

            // Caching Mechanism
            const booksCachingKey = `${KEYS.books}::${userId}`
            const cachedBook = await cachingConfig.get(booksCachingKey)

            const books = await getBooks(userId, queryParams)
            const bookStringify = JSON.stringify(books)

            if (!cachedBook || !(bookStringify == cachedBook)) {
                if (books && JSON.stringify(books) != '[]') {
                    await cachingConfig.setex(
                        booksCachingKey, 60 * 10, 
                        JSON.stringify(books)
                    )
                }

                return books
            } 

            return JSON.parse(cachedBook)
        }
        
        return await getBooks(userId, queryParams)

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}



module.exports = showBooksRepository