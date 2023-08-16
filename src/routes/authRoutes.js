const Joi = require('@hapi/joi')

const loginController = require('../controllers/authControllers/loginController')
const registerController = require('../controllers/authControllers/registerController')
const refreshController = require('../controllers/authControllers/refreshController')
const updatePasswordController = require('../controllers/authControllers/updatePasswordController')


/**
 *  Auth Routes
 * 
 *  @param {*} service 
 */
const authRoutes = async (service) => {

    /**
     *  Register Route
     */
     service.route({
        method  : 'POST',
        path    : '/register',
        handler : (userRequest, userResponse) =>
            registerController(userRequest, userResponse),
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                  fullname: Joi.string().required(),
                  email: Joi.string().email().required(),
                  password: Joi.string().required(),
                }),
            },
            // tags: ['api'],
            // description: 'Register Endpoint',
            cors: {
                origin: ['*'],
            },
        }
    })



    /**
     *  Login Route
     */
     service.route({
        method  : 'POST',
        path    : '/login',
        handler : (userRequest, userResponse) => 
            loginController(userRequest, userResponse),
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                  email: Joi.string().email().required(),
                  password: Joi.string().required(),
                }),
            },
            // tags: ['api'],
            // description: 'Login Endpoint',
            cors: {
                origin: ['*'],
            },
        }
    })



    /**
     *  Refresh Token Route
     */
     service.route({
        method  : 'POST',
        path    : '/refresh',
        handler : (userRequest, userResponse) =>
            refreshController(userRequest, userResponse),
        options: {
            auth: false,
            validate: {
                payload: Joi.object({
                  refresh_token: Joi.string().required(),
                }),
            },
            // tags: ['api'],
            // description: 'Refresh Token Endpoint',
            cors: {
                origin: ['*'],
            },
        }
    })



    /**
     *  Update Password Route
     */
     service.route({
        method  : 'PUT',
        path    : '/update_password',
        handler : (userRequest, userResponse) =>
            updatePasswordController(userRequest, userResponse),
        options: {
            validate: {
                payload: Joi.object({
                    password: Joi.string().required(),
                }),
            },
            // tags: ['api'],
            // description: 'Update Profile Endpoint',
            cors: {
                origin: ['*'],
            },
        }
    })

}



module.exports = authRoutes