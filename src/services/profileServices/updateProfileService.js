const emailChecking = require('../../utilities/emailChecking')
const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')

const updateProfileRepository = require('../../repositories/profileRepositories/updateProfileRepository')



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
 *  Update Profile Service
 * 
 *  @param {*} accessToken 
 *  @param {*} fullname 
 *  @param {*} email 
 *  @returns 
 */
const updateProfileService = async (baererToken, fullname, email) => {
    try {
        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        if (await emailChecking(email)) {
            return response(
                "Email already exists", 400,
                null, null
            )
        }

        // Update User Profile Datas
        const updateProfileRepo = await updateProfileRepository(
            userId, fullname, email
        )

        return response(
            "Update Profile Success!.", 201,
            updateProfileRepo.fullname,
            updateProfileRepo.email
        )

    } catch (errorMessage) {
        console.error(errorMessage)
        return response(
            "Internal Server Error!.", 500,
            null, null
        )
    }
}



module.exports = updateProfileService