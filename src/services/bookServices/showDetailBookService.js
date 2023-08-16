const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const showDetailBookRepository = require('../../repositories/bookRepositories/showDetailBookRepository')


 
/**
 *  Message Response
 * 
 *  @param {string} message 
 *  @param {int} httpCode
 *  @param {*} bookData
 *  @returns 
 */
const response = (message, httpCode, bookData) => {
    return { message, httpCode, bookData }
}



/**
 *  Show Detail Book Service
 * 
 *  @param {string} baererToken
 *  @param {string} bookId
 *  @returns 
 */
const showDetailBookService = async (baererToken, bookId) => {
    try {

        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        // Get Books Repo
        const getBookRepo = await showDetailBookRepository(
            userId, 
            bookId
        )

        if (!getBookRepo) {
            return response(
                'Get Detail Book Failed', 400, null
            )
        }

        return response(
            'Get Detail Book Success', 200,
            {...getBookRepo}
        )

    } catch(errorMessage) {
        console.error(errorMessage)
        return response(
            'Get Detail Book Failed', 500, null
        )
    }
}



module.exports = showDetailBookService