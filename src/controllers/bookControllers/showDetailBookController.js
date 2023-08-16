const showDetailBookService = require('../../services/bookServices/showDetailBookService')


/**
 *  Show Detail Book Controller
 * 
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const showDetailBookController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization

        // Get Book ID In Params
        const bookId = userRequest.params.bookId
        
        // Get Books Service
        const { 
            message, 
            httpCode, 
            bookData 
        } = await showDetailBookService(baererToken, bookId)

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



module.exports = showDetailBookController