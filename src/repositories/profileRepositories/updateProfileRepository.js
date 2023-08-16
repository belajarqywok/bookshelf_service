const databaseConfig = require('../../configurations/database')



/**
 *  Update Profile Repository
 * 
 *  @param {*} userId 
 *  @param {*} fullname 
 *  @param {*} email 
 *  @returns 
 */
const updateProfileRepository = async (userId, fullname, email) => {
    
    try {
        // Update User Profile Data By User ID
        const updateUserProfileData = await databaseConfig.user
            .update({
                where: { id: userId },
                data: { fullname, email },
                include: {}
            })

        if (!updateUserProfileData) {
            return {
                fullname: null,
                email: null
            }
        }

        return {
            fullname: updateUserProfileData.fullname,
            email: updateUserProfileData.email
        }

    } catch (errorMessage) {
        console.error(errorMessage)
        return {
            fullname: null,
            email: null
        }
    }

}



module.exports = updateProfileRepository