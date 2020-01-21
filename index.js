let hapi = require('@hapi/hapi')

let server = new hapi.Server({
    port: 3000,
    host: "0.0.0.0"
})

server.route({
    method : 'GET',
    path : '/',
    handler : (request, h) => {
    return h.response('hello world').code(200)
    }
})

let start = async () => {
    await server.start()
    console.log('Server running at: ', server.info.uri)
    return server
}

let init = async () => {
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

