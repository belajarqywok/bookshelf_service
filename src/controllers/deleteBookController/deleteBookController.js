const database   = require('../../database');
const responses  = require('../../responses');
const utilities  = require('../../utilities');



const deleteBookController = async (
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

        const bookIndex = await utilities.searchIndexIdObject(database.dummy, userRequest.params.bookId)

        if ( bookIndex == -1 ) {

            
            /**
             * 
             *  if request URL parameter "bookId"
             *  is not available
             * 
             */

            return userResponse.response(
                await responses.defaultResponse(
                    "fail",
                    "Buku gagal dihapus. Id tidak ditemukan"
                )
            )
            .code(404)

        } else {


            /**
             * 
             *  delete data according to the
             *  index that is intended
             * 
             */

            database.dummy.splice(bookIndex,1)

            return userResponse.response(
                await responses.defaultResponse(
                    "success",
                    "Buku berhasil dihapus"
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
                "Tidak dapat menghapus buku"
            )
        )
        .code(500)

    }

}




module.exports = deleteBookController