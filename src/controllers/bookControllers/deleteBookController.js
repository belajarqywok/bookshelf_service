const deleteBookService = require('../../services/bookServices/deleteBookService')


/**
 *  Delete Book Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const deleteBookController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization

        // Get Book ID In Params
        const bookId = userRequest.params.bookId
        
        // Delete Book Service
        const { 
            message, 
            httpCode, 
            bookData 
        } = await deleteBookService(
            baererToken, bookId, userRequest.payload
        )

        return userResponse.response({
            message: message,
            http_code: httpCode,
            data: bookData
        }).code(httpCode)


    } catch (errorMessage) {
        console.error(errorMessage)
        return userResponse.response({
            message: "Internal Server Error!.",
            http_code: 500,
            data: null
        }).code(500)
    }

}



module.exports = deleteBookController