const hapi = require('@hapi/hapi')
const hapiRateLimit  = require('hapi-rate-limit')
const loggingTraffic = require("hapi-plugin-traffic")

require('dotenv').config()

// Routes
const routes = require('./src/routes/routes')

// Middlewares
const logging = require('./src/middlewares/logging')

// Configurations
const auth = require('./src/configurations/auth')
const swaggerConf = require('./src/configurations/swagger')


// Database
// Database Re- use Connection
// const databaseConfig = require('./src/configurations/database')

// Database Close Connection Before Exit
// process.on('beforeExit', () => {
//   databaseConfig.$disconnect()
// })


/**
 *  Main
 */
const main = async () => {
  // Service
  const service = hapi.server({
    host: process.env.SRV_HOST || "localhost",
    port: parseInt(process.env.SRV_PORT) || 3000,
    routes: {
      cors: {
        origin: ['*'],
      },
    }
  })

  // Auth Configuration
  await auth.authConfiguration(service)

  // Swagger Configuration
  await swaggerConf(service)

  // Routes
  await routes(service)

  /* Middlewares */
  // Logging
  await service.register(loggingTraffic)
  service.events.on("response", (request) => logging(request))

  // Rate Limit
  await service.register({
    plugin: hapiRateLimit,
    options: {
      userLimit: parseInt(process.env.MAX_LIMIT_REQ) || 100,         
      userCache: {
        expiresIn: (
          // second * millisecond
          parseInt(process.env.MAX_LIMIT_REQ) * 1000
        ) || 60000
      }
    }
  })


  // Start Service
  await service.start()
  console.log(`Bookshelf service run on ${service.info.uri}`)
}


main().catch((errorMessage) => {
  console.error(
    "Error starting the server : ", 
    errorMessage
  )
})