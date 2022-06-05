const database   = require('../../database');
const responses  = require('../../responses');

const showDetailBookController = async (
    userRequest, userResponse
) => {


    /**
     * 
     *  Error Handling
     * 
     *  to prevent errors from occurring by
     *  returning a response to the user 
     * 
     */


    try {

        if ( database.dummy.filter(
                (data) => (data.id == userRequest.params.bookId)
        ).length <= 0 ) {


            /**
             * 
             *  if request URL parameter "bookId"
             *  is not available
             * 
             */


            return userResponse.response(
                await responses.defaultResponse(
                    "fail",
                    "Buku tidak ditemukan"
                )
            )
            .code(404)
    
    

        } else {
    
            return userResponse.response(
                await responses.showBookResponse(
                    "success",
                    database.dummy.filter(
                        (data) => (data.id == userRequest.params.bookId)
                    )
                )
            )
            .code(200)
    
        }



        
    } catch ( errorMessage ) {


        /**
     * 
     *  Error Handling
     * 
     *  to prevent errors from occurring by
     *  returning a response to the user 
     * 
     */

        console.error(errorMessage)

        return userResponse.response(
            await responses.defaultResponse(
                "error",
                "Buku tidak ditemukan"
            )
        )
        .code(500)

    }


}



module.exports = showDetailBookController