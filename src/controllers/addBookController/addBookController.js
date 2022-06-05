const models     = require('../../models');
const database   = require('../../database');
const responses  = require('../../responses');
const { nanoid } = require('nanoid');

const addBookController = async (
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
            .code(400)



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



        } else {
    

            const id = nanoid(16)
            const finished   = (pageCount === readPage)
            const insertedAt = new Date().toISOString()
            const updatedAt  = insertedAt
    
            
            /**
             * 
             *  add data to a dummy database
             * 
             */

            database.dummy.push(
                await models.bookModels(
                    id, name, year, author, summary, publisher,
                    pageCount, readPage, finished, reading,
                    insertedAt, updatedAt
                )
            )
    
    
            if ( database.dummy.filter(
                (data) => data.id === id).length > 0
            ) {

                return userResponse.response(
                    await responses.addBookResponse(
                        "success",
                        "Buku berhasil ditambahkan",
                        id
                    )
                )
                .code(201)
                
            } else {

                return userResponse.response(
                    await responses.defaultResponse(
                        "fail",
                        "Gagal menambahkan buku"
                    )
                )
                .code(400)

            }

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

        console.error(errorMessage);

        return userResponse.response(
            await responses.defaultResponse(
                "error",
                "Buku gagal ditambahkan"
            )
        )
        .code(500)

    }

}




module.exports = addBookController