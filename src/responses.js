const defaultResponse = async (
    status, message
) => {

    return {

        status  : status,  // string
        message : message  // string

    }

}



const addBookResponse = async (
    status, message, bookId
) => {

    return {

        status  : status,    // string
        message : message,   // string
        data    : {
            bookId : bookId  // string
        }

    }

}



const showBookResponse = async (
    status, bookDatas
) => {

    return {

        status : status,        // string
        data   : {
            book : bookDatas   // array
        }
        
    }

}



const showBooksResponse = async (
    status, bookDatas
) => {

    return {

        status : status,        // string
        data   : {
            books : bookDatas   // array
        }
        
    }

}




module.exports = {

    defaultResponse,

    addBookResponse,

    showBookResponse,
    
    showBooksResponse

}