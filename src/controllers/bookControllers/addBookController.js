const addBookService = require('../../services/bookServices/addBookService')


const addBookController = async (
    userRequest, userResponse
) => {

    try {

        // Get Baerer Token In Header
        const baererToken = userRequest.headers.authorization
        
        // Add Book Service
        const { message, httpCode, bookData } = await addBookService(
            baererToken, {...userRequest.payload}
        )

        if (bookData == null) {
            return userResponse.response({
                message: message,
                http_code: httpCode,
                data: null
            }).code(httpCode)
        }

        return userResponse.response({
            message: message,
            http_code: httpCode,
            data: {...bookData}
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



module.exports = addBookController