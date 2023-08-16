const databaseConfig = require('../../configurations/database')



/**
 *  Get Profile Repository
 * 
 *  @param {*} userId 
 */
const getProfileRepository = async (userId) => {
    try {
        // Get User Profile Data By User ID
        const getUserProfileData = await databaseConfig.user
            .findUnique({
                where: { id: userId },
                select: { fullname: true, email: true }
            })

        return {
            fullname: getUserProfileData.fullname,
            email: getUserProfileData.email
        }

    } catch (errorMessage) {
        console.error(errorMessage)
        return {fullname: null, email: null}
    }
}



module.exports = getProfileRepository