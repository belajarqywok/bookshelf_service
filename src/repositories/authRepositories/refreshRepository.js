const databaseConfig = require('../../configurations/database')


const refreshRepository = async (userId) => {
    try {
        // Get User ID
        const getUserData = await databaseConfig.user
            .findUnique({
                where: { id: userId }
            })

        return getUserData

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}



module.exports = refreshRepository