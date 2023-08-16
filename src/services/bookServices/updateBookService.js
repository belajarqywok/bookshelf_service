const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const updateBookRepository = require('../../repositories/bookRepositories/updateBookRepository')


 
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
 *  Update Book Service
 * 
 *  @param {string} baererToken
 *  @param {string} bookId
 *  @param {object} bookData
 *  @returns 
 */
const updateBookService = async (baererToken, bookId, bookData) => {
    try {

        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        // Update Book Repo
        const updateBookRepo = await updateBookRepository(
            userId, bookId, bookData
        )

        if (!updateBookRepo) {
            return response(
                'Update Book Failed', 400, null
            )
        }

        return response(
            'Update Book Success', 201,
            {
                name: updateBookRepo.name,
                year: updateBookRepo.year,
                author: updateBookRepo.author,
                summary: updateBookRepo.summary,
                publisher: updateBookRepo.publisher,
                pageCount: updateBookRepo.pageCount,
                stock: updateBookRepo.stock
            }
        )

    } catch(errorMessage) {
        console.error(errorMessage)
        return response(
            'Update Book Failed', 500, null
        )
    }
}



module.exports = updateBookService