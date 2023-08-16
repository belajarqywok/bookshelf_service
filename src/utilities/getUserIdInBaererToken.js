const getUserIdToken = require('./getUserIdToken')

/**
 *  Get User ID in Bearer Token
 * 
 *  @param {*} BearerTokenHeader 
 *  @returns 
 */
const getUserIdInBearerToken = (BearerTokenHeader) => {
    try {
        // Get Token
        const token = BearerTokenHeader.substr(7)

        // Get User ID
        const userId = getUserIdToken(token)

        return userId

    } catch (errorMessage) {
        console.error(errorMessage);
        return undefined
    }
}

module.exports = getUserIdInBearerToken