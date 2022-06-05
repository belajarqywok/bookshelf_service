const models     = require('../../models');
const database   = require('../../database');
const responses  = require('../../responses');
const utilities  = require('../../utilities');

const editBookController = async (
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


        /**
         * 
         *  Request Payload
         * 
         *  Data types :
         *      - name : string
         *      - year : number
         *      - author : string
         *      - summary : string
         *      - publisher : string
         *      - pageCount : number
         *      - readPage  : number
         *      - reading   : boolean
         * 
         */

        const { 

            name, year, author, summary,
            publisher, pageCount, readPage,
            reading

        } = userRequest.payload

        const bookIndex = await utilities.searchIndexIdObject(database.dummy, userRequest.params.bookId)

        if ( ( name === undefined ) || ( name === "" ) ) {


            /**
             * 
             *  if the user sends with an
             *  undefined or empty "name"
             * 
             */


            return userResponse.response(
                await responses.defaultResponse(
                    "fail",
                    "Gagal menambahkan buku. Mohon isi nama buku"
                )
            )
            .code(400);



        } else if ( readPage > pageCount ) {


            /**
             * 
             *  if "readPage" is greater than "pageCount"
             * 
             */
        
            return userResponse.response(
                await responses.defaultResponse(
                    "fail",
                    "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
                )
            )
            .code(400)



        } else if ( bookIndex == -1 ) {

            /**
             * 
             *  if request URL parameter "bookId"
             *  is not available
             * 
             */

            return userResponse.response(
                await responses.defaultResponse(
                    "fail",
                    "Gagal memperbarui buku. Id tidak ditemukan"
                )
            )
            .code(404)

        } else {

            const id = database.dummy[bookIndex].id
            const finished   = (pageCount === readPage)
            const insertedAt = database.dummy[bookIndex].insertedAt
            const updatedAt  = new Date().toISOString()


            /**
             * 
             *  replace previously entered data with new data
             * 
             */

            database.dummy[bookIndex] = await models.bookModels(

                id, name, year, author, summary, publisher,
                pageCount, readPage, finished, reading,
                insertedAt, updatedAt

            )

            return userResponse.response(
                await responses.defaultResponse(
                    "success",
                    "Buku berhasil diperbarui"
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


module.exports = editBookController