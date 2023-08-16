const databaseConfig = require('../../configurations/database')



/**
 *  Login Repository
 * 
 *  @param {*} email 
 *  @param {*} password 
 *  @returns  
 */
const loginRepository = async (email, password) => {
    try {
        // Find user by credentials
        return await databaseConfig.user.findUnique({
            where: { 
                email: email,
                password: password
            },
        })


    } catch (errorMessage) {
        console.error(errorMessage)
        return false
    }
}



module.exports = loginRepository