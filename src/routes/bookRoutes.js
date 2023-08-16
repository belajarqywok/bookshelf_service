const Joi = require('@hapi/joi')

const addBookController = require('../controllers/bookControllers/addBookController')
const getBooksController = require('../controllers/bookControllers/showBooksController')
const showDetailBookController = require('../controllers/bookControllers/showDetailBookController')
const updateBookController = require('../controllers/bookControllers/updateBookController')
const deleteBookController = require('../controllers/bookControllers/deleteBookController')



/**
 *  Book Routes
 * 
 *  @param {*} service 
 */
const bookRoutes = async (service) => {


    /**
     *  Add Book Route
     */
     service.route({
        method  : 'POST',
        path    : '/books',
        handler : (userRequest, userResponse) =>
            addBookController(userRequest, userResponse),
        options: {
            validate: {
                payload: Joi.object({
                  name: Joi.string().required(),
                  year: Joi.number().required(),
                  author: Joi.string().required(),
                  summary: Joi.string().required(),
                  publisher: Joi.string().required(),
                  pageCount: Joi.number().required(),
                  stock: Joi.number().required(),
                })
            }
        }
    })



    /**
     *  Get Books Route
     */
     service.route({
        method  : 'GET',
        path    : '/books',
        handler : (userRequest, userResponse) => 
            getBooksController(userRequest, userResponse)
    })



    /**
     *  Get Book By Book ID
     */
     service.route({
        method  : 'GET',
        path    : '/books/{bookId}',
        handler : (userRequest, userResponse) => 
            showDetailBookController(userRequest, userResponse),
    })



    /**
     *  Add Book Route
     */
     service.route({
        method  : 'PUT',
        path    : '/books/{bookId}',
        handler : (userRequest, userResponse) =>
            updateBookController(userRequest, userResponse),
        options: {
            validate: {
                payload: Joi.object({
                  name: Joi.string().required(),
                  year: Joi.number().required(),
                  author: Joi.string().required(),
                  summary: Joi.string().required(),
                  publisher: Joi.string().required(),
                  pageCount: Joi.number().required(),
                  stock: Joi.number().required(),
                })
            }
        }
    })



    /**
     *  Delete Book By Book ID
     */
     service.route({
        method  : 'DELETE',
        path    : '/books/{bookId}',
        handler : (userRequest, userResponse) => 
            deleteBookController(userRequest, userResponse),
    })


}



module.exports = bookRoutes