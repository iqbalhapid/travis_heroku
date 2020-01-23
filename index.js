const hapi = require('@hapi/hapi')
const {connectMongo} = require('./config/mongoConnect')
const route = require('./src/routes')

const server = new hapi.Server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0"
})

server.route(route)


const start = async () => {
    await server.start()
    await connectMongo();
    console.log('Server running at: ', server.info.uri)
    return server
}

const init = async () => {
    await server.initialize();
    return server;
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})
// start()

exports.start = start
exports.init = init

