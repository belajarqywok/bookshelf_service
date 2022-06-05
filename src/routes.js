const responses   = require('./responses');
const controllers = require('./controllers/controllers')


const routes = [

    
    {

        method  : 'GET',
        path    : '/',
        handler : (_userRequest, userResponse) => {
            return userResponse.response(
                
                {
                    status  : "success",
                    message : "Bookshelf API berjalan dengan baik"
                }
                
            )
            .code(200)
        },
        options: {
            cors: {
              origin: ['*'],
            },
        }

    },



    {

        method  : 'POST',
        path    : '/books',
        handler : controllers.addBookController,
        options: {
            cors: {
              origin: ['*'],
            },
        }

    },



    {

        method  : 'GET',
        path    : '/books',
        handler : controllers.showBooksController,
        options: {
            cors: {
              origin: ['*'],
            },
        }

    },



    {

        method  : 'GET',
        path    : '/books/{bookId}',
        handler : controllers.showDetailBookController,
        options: {
            cors: {
              origin: ['*'],
            },
        }

    },



    {

        method  : 'PUT',
        path    : '/books/{bookId}',
        handler : controllers.editBookController,
        options: {
            cors: {
              origin: ['*'],
            },
        }

    },



    {

        method  : 'DELETE',
        path    : '/books/{bookId}',
        handler : controllers.deleteBookController,
        options: {
            cors: {
              origin: ['*'],
            },
        }

    }

]






module.exports = routes