const showBooksService = require('../../services/bookServices/showBooksService')



/**
 *  Show Books Controller
 *  
 *  @param {*} userRequest 
 *  @param {*} userResponse 
 *  @returns 
 */
const showBooksController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization

        // Get Query Params
        const queryParams = {
            name: userRequest.query.name,
            year: parseInt(userRequest.query.year) || undefined,
            author: userRequest.query.author || undefined,
            publisher: userRequest.query.publisher || undefined,
            pageCount: parseInt(userRequest.query.pageCount) || undefined,
            stock: parseInt(userRequest.query.stock) || undefined
        }
        
        // Show Books Service
        const { 
            message, 
            httpCode, 
            bookData 
        } = await showBooksService(baererToken, queryParams)

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



module.exports = showBooksController