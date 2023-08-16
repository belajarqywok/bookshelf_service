const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const deleteBookRepository = require('../../repositories/bookRepositories/deleteBookRepository')


 
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
 *  Delete Book Service
 * 
 *  @param {string} baererToken
 *  @param {string} bookId
 *  @returns 
 */
const deleteBookService = async (baererToken, bookId) => {
    try {

        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        // Delete Book Repo
        const deleteBookRepo = await deleteBookRepository(
            userId, bookId
        )

        if (!deleteBookRepo) {
            return response(
                'Delete Book Failed', 400, null
            )
        }

        return response(
            'Delete Book Success', 200, null
        )

    } catch(errorMessage) {
        console.error(errorMessage)
        return response(
            'Delete Book Failed', 500, null
        )
    }
}



module.exports = deleteBookService