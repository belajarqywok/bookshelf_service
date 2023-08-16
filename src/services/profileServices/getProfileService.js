const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const getProfileRepository = require('../../repositories/profileRepositories/getProfileRepository')



/**
 *  Message Response
 * 
 *  @param {*} message 
 *  @param {*} httpCode 
 *  @param {*} fullname 
 *  @param {*} email 
 *  @returns 
 */
const response = (message, httpCode, fullname, email) => {
    return { message, httpCode, fullname, email }
}



/**
 *  Get Profile Service
 * 
 *  @param {*} accessToken 
 */
const getProfileService = async (accessToken) => {
    try {
        // Get User ID in Token
        const userId = await getUserIdInBaererToken(accessToken)

        // Get User Profile Datas
        const { fullname, email } = await getProfileRepository(userId)

        return response(
            "Get Profile Success!.", 200,
            fullname, email
        )

    } catch (errorMessage) {
        console.error(errorMessage)
        return response(
            "Internal Server Error!.", 500,
            null, null
        )
    }
}



module.exports = getProfileService