const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')

const swaggerConf = async (service) => {
    await service.register([Inert, Vision])

    await service.register({
        plugin: HapiSwagger,
        options: {
          info: {
            title: 'BookShelf Service',
            version: '1.0.0',
          },
        },
    })
}


module.exports = swaggerConf