require('dotenv').config()



/**
 *  Redis Configuration
 */

const Redis = require('ioredis')

const cachingConfig = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    // password: process.env.REDIS_PASSWORD,
})



/**
 *  Caching Keys
 */
const KEYS = {

    // Activities Key
    // Impl: `activities::${userId}`
    // activities: "activities",


    // Books Key
    // Impl: `books::${userId}`
    books: "books",


    // Access Token Key
    // Impl: `token::access::${userId}`
    // accessToken: "token::access",


    // Refresh Token Key
    // Impl: `token::refresh::${userId}`
    // refreshToken: "token::refresh"

}



module.exports = { 
    // Redis Configuration
    cachingConfig,

    // Redis Keys
    KEYS
}