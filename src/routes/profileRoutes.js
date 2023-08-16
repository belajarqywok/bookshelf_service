const Joi = require('@hapi/joi')

const getProfileController = require('../controllers/profileControllers/getProfileController')
const updateProfileController = require('../controllers/profileControllers/updateProfileController')
const deleteProfileController = require('../controllers/profileControllers/deleteProfileController')



/**
 *  Profile Routes
 * 
 *  @param {*} service 
 */
const profileRoutes = async (service) => {

    /**
     *  Profile Route
     */
     service.route({
        method  : 'GET',
        path    : '/profile',
        handler : (userRequest, userResponse) => 
            getProfileController(userRequest, userResponse),
        options: {
            // tags: ['api'],
            // description: 'Profile Endpoint',
            cors: {
                origin: ['*'],
            },
        }
    })



    /**
     *  Update Profile Route
     */
     service.route({
        method  : 'PUT',
        path    : '/profile',
        handler : (userRequest, userResponse) => 
            updateProfileController(userRequest, userResponse),
        options: {
            validate: {
                payload: Joi.object({
                    fullname: Joi.string().required(),
                    email: Joi.string().email().required(),
                }),
            },
            // tags: ['api'],
            // description: 'Update Profile Endpoint',
            cors: {
                origin: ['*'],
            },
        }
    })



    /**
     *  Delete Profile Route
     */
     service.route({
        method  : 'DELETE',
        path    : '/profile',
        handler : (userRequest, userResponse) => 
            deleteProfileController(userRequest, userResponse),
        options: {
            // tags: ['api'],
            // description: 'Update Password Endpoint',
            cors: {
                origin: ['*'],
            },
        }
    })
}



module.exports = profileRoutes