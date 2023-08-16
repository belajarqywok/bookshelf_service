const databaseConfig = require('../configurations/database')


/**
 *  Email Checking
 * 
 *  @param {*} email 
 *  @returns 
 */
 const emailChecking = async (email) => {
    try {
        // Find Unique Email
        return await databaseConfig.user.findUnique({
            where: { email },
        })

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}



module.exports = emailChecking