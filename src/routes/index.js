const handler = require('../handler')

const root = {
    method: 'GET',
    path: '/',
    handler: handler.root
}

const register = {
    method: 'POST',
    path: '/user/register',
    handler: handler.register
}

const login = {
    method: 'POST',
    path: '/user/login',
    handler: handler.login
}
module.exports = [root, register, login]