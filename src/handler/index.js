const Boom = require('@hapi/boom')
const {User} = require('../../config/mongoSchema')

exports.register = (request, h) => {
    const {payload} = request
    return User.create(payload)
    .then(res => h.response({res, message : 'register success'}).code(201))
    .catch(error => {
        const errorMessage = error.toString()
        if (errorMessage.match(/ValidationError|CastError/)) {
            return Boom.badRequest("invalid email id or password")    
        } else if(errorMessage.match('E11000')) {
            return Boom.conflict("email is already use")
        } else {
            return Boom.boomify(error)
        }    
})}
    


exports.login = (request, h) => {
    const {payload} = request
    const data = payload.email ? {email: payload.email} : {username: payload.username}
    return User.findOne(data).lean()
        .then(async res => {
            if (!res) {
                return Boom.notFound('No User found');
            }
            if (res.password != payload.password) {
                return Boom.notAcceptable('Wrong Password');
            }
            return h.response(res).code(202)
        })
        .catch(error => Boom.boomify(error))
}

exports.root = (request, h) => {
    return h.response({ message: 'hello '})
}