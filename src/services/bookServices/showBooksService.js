const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const showBooksRepository = require('../../repositories/bookRepositories/showBooksRepository')



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
 *  Show Books Service
 * 
 *  @param {string} baererToken
 *  @param {object} queryParams 
 *  @returns 
 */
const showBooksService = async (baererToken, queryParams) => {
    try {

        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        // Show Books Repo
        const showBooksRepo = await showBooksRepository(
            userId, queryParams
        )

        if (!showBooksRepo) {
            return response(
                'Get Books Failed', 400, null
            )
        }

        return response(
            'Get Books Success', 200,
            showBooksRepo
        )

    } catch(errorMessage) {
        console.error(errorMessage)
        return response(
            'Get Books Failed', 500, null
        )
    }
}



module.exports = showBooksService