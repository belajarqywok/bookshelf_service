const addBookController        = require("./addBookController/addBookController")
const showBooksController      = require("./showBooksController/showBooksController")
const showDetailBookController = require('./showDetailBookController/showDetailBookController')
const editBookController       = require('./editBookController/editBookController')
const deleteBookController     = require('./deleteBookController/deleteBookController')

class controllers {


    constructor () {

        /**
         * 
         *  constructor
         * 
         */

    }



    addBookController ( userRequest, userResponse ) {

        /**
         * 
         *  add book controller
         * 
         */

        return addBookController ( userRequest, userResponse )

    }



    showBooksController ( userRequest, userResponse ) {

        /**
         * 
         *  show books controller
         * 
         */

        return showBooksController ( userRequest, userResponse )

    }



    showDetailBookController ( userRequest, userResponse ) {

        /**
         * 
         *  show detail book controller
         * 
         */

        return showDetailBookController ( userRequest, userResponse )

    }



    editBookController ( userRequest, userResponse ) {

        /**
         * 
         *  edit book controller
         * 
         */

        return editBookController ( userRequest, userResponse )

    }



    deleteBookController ( userRequest, userResponse ) {

        /**
         * 
         *  delete book controller
         * 
         */

         return deleteBookController ( userRequest, userResponse )
        
    }


}



module.exports = new controllers()