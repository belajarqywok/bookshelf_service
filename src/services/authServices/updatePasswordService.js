const crypto = require('crypto')
const getUserIdInBaererToken = require('../../utilities/getUserIdInBaererToken')
const updatePasswordRepository = require('../../repositories/authRepositories/updatePasswordRepository')



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
 *  Update Password Service
 * 
 *  @param {*} baererToken 
 *  @param {*} password
 *  @returns 
 */
const updatePasswordService = async (baererToken, password) => {
    try {

        // Get User ID in Token
        const userId = await getUserIdInBaererToken(baererToken)

        // Hash the Password
        const hashedPassword = crypto.createHash('sha512')
            .update(password).digest('hex')

        // Update Password By User ID
        const updatePasswordRepo = await updatePasswordRepository(
            userId, hashedPassword
        )

        if (!updatePasswordRepo) {
            return response(
                "Update Password Failed!.", 400
            )
        }

        return response(
            "Update Password Success!.", 201
        )

    } catch (errorMessage) {
        console.error(errorMessage)
        return response(
            "Internal Server Error!.", 500
        )
    }
}



module.exports = updatePasswordService