const databaseConfig = require('../../configurations/database')




/**
 *  Update Profile Repository
 * 
 *  @param {*} userId
 *  @returns 
 */
const updatePasswordRepository = async (userId, password) => {

    try {
        // Update Password By User ID
        return await databaseConfig.user
            .update({
                where: { id: userId },
                data: { password },
                include: {}
            })

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }

}



module.exports = updatePasswordRepository