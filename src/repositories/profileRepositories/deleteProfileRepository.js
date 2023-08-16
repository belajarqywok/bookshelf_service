const databaseConfig = require('../../configurations/database')


/**
 *  Update Profile Repository
 * 
 *  @param {*} userId
 *  @returns 
 */
const deleteProfileRepository = async (userId) => {
    
    try {
        // Delete User Profile Data By User ID
        return await databaseConfig.user
            .delete({
                where: { id: userId }
            })

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }

}



module.exports = deleteProfileRepository