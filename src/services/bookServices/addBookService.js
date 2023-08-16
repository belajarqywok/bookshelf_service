const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const addBookRepository = require('../../repositories/bookRepositories/addBookRepository')



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
 *  Add Book Service
 * 
 *  @param {string} baererToken
 *  @param {object} payload
 *  @returns 
 */
const addBookService = async (baererToken, payload) => {
    try {

        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        // Add Book Repo
        const addBookRepo = await addBookRepository(
            userId, {...payload}
        )

        if (!addBookRepo) {
            return response(
                'Add Book Failed', 400, null
            )
        }

        return response(
            'Add Book Success', 201, 
            {...addBookRepo}
        )

    } catch(errorMessage) {
        console.error(errorMessage)
        return response(
            'Add Book Failed', 500, null
        )
    }
}



module.exports = addBookService