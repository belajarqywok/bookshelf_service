const databaseConfig = require('../../configurations/database')



/**
 *  Create User
 * 
 *  @param {*} userState 
 */
const registerRepository = async (fullname, email, password) => {
    try {
        // Create User
        return await databaseConfig.user.create({
            data: {
                fullname, email,
                password: password,
            },
        })

    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}


module.exports = registerRepository