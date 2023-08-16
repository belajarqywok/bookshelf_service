const Joi = require('@hapi/joi')

const addActivityController = require('../controllers/activityControllers/addActivityController')
const showActivitiesController = require('../controllers/activityControllers/showActivitiesController')
const showDetailActivityController = require('../controllers/activityControllers/showDetailActivityController')
const updateActivityController = require('../controllers/activityControllers/updateActivityController')
const deleteActivityController = require('../controllers/activityControllers/deleteActivityController')



/**
 *  Activity Routes
 * 
 *  @param {*} service 
 */
 const activityRoutes = async (service) => {


    /**
     *  Add Activity Route
     */
     service.route({
        method  : 'POST',
        path    : '/activities',
        handler : (userRequest, userResponse) =>
            addActivityController(userRequest, userResponse),
        options: {
            validate: {
                payload: Joi.object({
                  book_id: Joi.string().required(),
                  read_page: Joi.number().required(),
                  finished: Joi.boolean().required(),
                  reading: Joi.boolean().required()
                })
            }
        }
    })



    /**
     *  Get Activities Route
     */
     service.route({
        method  : 'GET',
        path    : '/activities',
        handler : (userRequest, userResponse) => 
            showActivitiesController(userRequest, userResponse)
    })



    /**
     *  Get Detail Activity Route
     */
     service.route({
        method  : 'GET',
        path    : '/activities/{activityId}',
        handler : (userRequest, userResponse) => 
            showDetailActivityController(userRequest, userResponse)
    })



    /**
     *  Update Activity Route
     */
     service.route({
        method  : 'PUT',
        path    : '/activities/{activityId}',
        handler : (userRequest, userResponse) => 
            updateActivityController(userRequest, userResponse),
        options: {
            validate: {
                payload: Joi.object({
                    read_page: Joi.number().required(),
                    finished: Joi.boolean().required(),
                    reading: Joi.boolean().required()
                })
            }
        }
    })



    /**
     *  Delete Activity Route
     */
     service.route({
        method  : 'DELETE',
        path    : '/activities/{activityId}',
        handler : (userRequest, userResponse) => 
            deleteActivityController(userRequest, userResponse)
    })

}



module.exports = activityRoutes