// Auth Routes
const authRoutes = require('./authRoutes')

// Book Routes
const bookRoutes = require('./bookRoutes')
const bookRoutesOld = require('./bookRoutesOld')

// Profile Routes
const profileRoutes = require('./profileRoutes')

// Activity Routes
const activityRoutes = require('./activityRoutes')



/**
 *  Routes
 * 
 *  @param {*} service 
 */
const routes = async (service, databaseConfig) => {

    // Route Grouping
    service.realm.modifiers.route.prefix = '/v1'

    // Auth Routes
    await authRoutes(service, databaseConfig)

    // Book Routes
    await bookRoutes(service)
    await bookRoutesOld(service)

    // Profile Routes
    await profileRoutes(service)

    // Activity Routes
    await activityRoutes(service)

}



module.exports = routes