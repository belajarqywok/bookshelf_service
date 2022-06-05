const app    = require('@hapi/hapi')
const routes = require('./routes') 
const loggingTraffic = require("hapi-plugin-traffic")

const runServer = async (
    host, port
) => {

	const server = app.server({

        port : port,
        host : host,
        routes: {
            cors: {
              origin: ['*'],
            },
          }

    });

    server.route(routes)
    await server.register(loggingTraffic)

    server.events.on("response", (request) => {
      let traffic = request.traffic()
      console.log(
          `recv=${traffic.recvPayload}/${traffic.recvRaw} ` +
          `sent=${traffic.sentPayload}/${traffic.sentRaw} ` +
          `start=${new Date(traffic.timeStart)} ` +
          `finish=${new Date(traffic.timeFinish)} ` +
          `duration=${traffic.timeDuration}ms`
      )
    })

     
    await server.start()
    console.log(`Server berjalan pada ${server.info.uri}`)
};

module.exports = { runServer }