const addBookController        = require("../controllers/bookControllersOld/addBookController")
const showBooksController      = require("../controllers/bookControllersOld/showBooksController")
const showDetailBookController = require('../controllers/bookControllersOld/showDetailBookController')
const editBookController       = require('../controllers/bookControllersOld/editBookController')
const deleteBookController     = require('../controllers/bookControllersOld/deleteBookController')


const bookRoutesOld = async (service) => {
    
    /**
     *  Index Route
     */
    service.route({
        method  : 'GET',
        path    : '/',
        handler : (_userRequest, userResponse) => {
            return userResponse.response({
                status  : "success",
                message : "Bookshelf API berjalan dengan baik"
            }).code(200)
        },
        options: {
            tags: ['api'],
            description: 'Service Checking',
            cors: {
                origin: ['*'],
            },
        }
    })


    /**
     *  Add Book Route
     */
    service.route({
        method  : 'POST',
        path    : '/books_old',
        handler : (userRequest, userResponse) =>
            addBookController(userRequest, userResponse),
        options: {
            tags: ['api'],
            description: 'Add Book',
            cors: {
                origin: ['*'],
            },
        }
    })


    /**
     *  Show Books Route
     */
    service.route({
        method  : 'GET',
        path    : '/books_old',
        handler : (userRequest, userResponse) =>
            showBooksController(userRequest, userResponse),
        options : {
            tags: ['api'],
            description: 'Show Books',
            cors: {
                origin: ['*'],
            },
        }
    })


    /**
     *  Show Detail Book Route
     */
    service.route({
        method  : 'GET',
        path    : '/books_old/{bookId}',
        handler : (userRequest, userResponse) =>
            showDetailBookController(userRequest, userResponse),
        options : {
            tags: ['api'],
            description: 'Get Spesific Book',
            cors: {
                origin: ['*'],
            },
        }
    })


    /**
     *  Edit Book Route
     */
    service.route({
        method  : 'PUT',
        path    : '/books_old/{bookId}',
        handler : (userRequest, userResponse) =>
            editBookController(userRequest, userResponse),
        options : {
            tags: ['api'],
            description: 'Edit Book',
            cors: {
                origin: ['*'],
            },
        }
    })


    /**
     *  Delete Book Route
     */
    service.route({
        method  : 'DELETE',
        path    : '/books_old/{bookId}',
        handler : (userRequest, userResponse) =>
            deleteBookController(userRequest, userResponse),
        options : {
            tags: ['api'],
            description: 'Delete Book',
            cors: {
                origin: ['*'],
            },
        }
    })

}



module.exports = bookRoutesOld