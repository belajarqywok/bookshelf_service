const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const deleteProfileRepository = require('../../repositories/profileRepositories/deleteProfileRepository')



/**
 *  Message Response
 * 
 *  @param {*} message 
 *  @param {*} httpCode
 *  @returns 
 */
const response = (message, httpCode) => {
    return { message, httpCode }
}



/**
 *  Delete Profile Service
 * 
 *  @param {*} baererToken 
 *  @returns 
 */
const deleteProfileService = async (baererToken) => {
    try {
        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        // Delete User Profile Datas
        const deleteProfileRepo = await deleteProfileRepository(userId)

        if (!deleteProfileRepo) {
            return response(
                "Delete Profile Failed!.", 400
            )
        }

        return response(
            "Delete Profile Success!.", 200
        )

    } catch (errorMessage) {
        console.error(errorMessage)
        return response(
            "Internal Server Error!.", 500
        )
    }
}



module.exports = deleteProfileService