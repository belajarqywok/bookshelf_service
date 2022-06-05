const database   = require('../../database');
const responses  = require('../../responses');

const showBooksController = async (
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

        if ( userRequest.query.name != undefined ) {

            /**
             * 
             *  if the user sends with an
             *  undefined or empty "name"
             * 
             */

            const bookDatas = []

            const nameFilter = database.dummy.filter(
                (data) => (data.name == userRequest.query.name )
            )

            for ( let indexName = 0; indexName < nameFilter.length; indexName ++ ) {

                bookDatas.push(
                    {
                        id   : nameFilter[indexName].id,
                        name : nameFilter[indexName].name,
                        publisher : nameFilter[indexName].publisher
                    }
                )

            }

            return userResponse.response(
                await responses.showBookResponse(
                    "success",
                    bookDatas
                )
            )
            .code(200)




        } else if ( userRequest.query.reading != undefined ) {

            
            /**
             * 
             *  if the user sends with an
             *  undefined or empty "reading"
             * 
             */

            const bookDatas = []

            const readingFilter = database.dummy.filter(
                (data) => (data.reading == userRequest.query.reading )
            )

            for ( let indexReading = 0; indexReading < readingFilter.length; indexReading ++ ) {

                bookDatas.push(
                    {
                        id   : readingFilter[indexReading].id,
                        name : readingFilter[indexReading].name,
                        publisher : readingFilter[indexReading].publisher
                    }
                )

            }

            return userResponse.response(
                await responses.showBookResponse(
                    "success",
                    bookDatas
                )
            )
            .code(200)




        } else if ( userRequest.query.finished != undefined ) {


            /**
             * 
             *  if the user sends with an
             *  undefined or empty "finished"
             * 
             */

            const bookDatas = []

            const finishedFilter = database.dummy.filter(
                (data) => (data.finished == userRequest.query.finished )
            )

            for ( let indexFinished = 0; indexFinished < finishedFilter.length; indexFinished ++ ) {

                bookDatas.push(
                    {
                        id   : finishedFilter[indexFinished].id,
                        name : finishedFilter[indexFinished].name,
                        publisher : finishedFilter[indexFinished].publisher
                    }
                )


            }

            return userResponse.response(
                await responses.showBookResponse(
                    "success",
                    bookDatas
                )
            )
            .code(200)




        } else {

            const bookDatas = []

            if ( database.dummy.length > 0 ) {

                for (
                    let indexBookDatas = 0;
                    indexBookDatas < database.dummy.length;
                    indexBookDatas ++ 
                ) {
        
                    bookDatas.push(
                        {
                            id   : database.dummy[indexBookDatas].id,
                            name : database.dummy[indexBookDatas].name,
                            publisher : database.dummy[indexBookDatas].publisher
                        }
                    )
        
                }
    
            }

            return userResponse.response(
                await responses.showBookResponse(
                    "success",
                    bookDatas
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

        console.error(errorMessage);

        return userResponse.response(
            await responses.defaultResponse(
                "error",
                "Buku gagal dilihat"
            )
        )
        .code(500)

    }

}




module.exports = showBooksController