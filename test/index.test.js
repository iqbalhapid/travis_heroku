let Lab = require('@hapi/lab');
let { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
let { expect } = require('@hapi/code')
let { init } = require('../index');

describe('GET /', () => {
    let server

    beforeEach(async () => {
        server = await init();
    })

    afterEach(async () => {
        await server.stop();
    })

    it(' see all data ', async () => {
        const res = await server.inject({
            method: 'GET',
            url: '/'
        });
        expect(res.statusCode).to.equal(200);
    })
})