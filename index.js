'use strict'

const hapi = require('@hapi/hapi')

const server = new hapi.Server({
    port: process.env.port,
    host: "0.0.0.0"
})

server.route({
    method : 'GET',
    path : '/',
    handler : (request, h) => {
    return h.response('hello world').code(200)
    }
})

const start = async () => {
    await server.start()
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
start()

exports.start = start
exports.init = init

