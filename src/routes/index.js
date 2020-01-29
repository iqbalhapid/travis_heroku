const handler = require('../handler')
const Joi = require('@hapi/joi')

const success = Joi.object({
    success: Joi.boolean().truthy().required(),
});

const error = Joi.object({
    statusCode: Joi.number().required(),
    error: Joi.string(),
    message: Joi.string(),
});

const validationError = error.keys({
    validation: Joi.object().optional(),
});

const root = {
    method: 'GET',
    path: '/',
    options: {
        response: {
            status: {
                200: Joi.object({ message : "hello" }),
                400: validationError,
                500: error
            },
            failAction: async (req, h, err) => {
                if(err) {
                    console.log(`Server error: ${err}`)
                }
            }
        }
    },
    options : {
        description: 'Get test message',
        notes: 'Returns a message ',
        tags: ['api'], // ADD THIS TAG
    },
    handler: handler.root
}

const register = {
    method: 'POST',
    path: '/user/register',
    options: {
        description: 'API for user register',
        notes: 'Returns email, username, password',
        tags: ['api'],
        validate: {
            payload: {
                email: Joi.string().required(),
                username : Joi.string().required(),
                password : Joi.string().min(8)
            }
        },
        response: {
            status: {
                200: success,
                400: validationError,
                500: error
            },
            failAction: async (req, h, err) => {
                if(err) {
                    console.log(err)
                }
            }
        }
    },
    // options : {
    //     description: 'API for user register',
    //     notes: 'Returns email, username, password',
    //     tags: ['api'], // ADD THIS TAG
    // },
    handler: handler.register
}

const login = {
    method: 'POST',
    path: '/user/login',
    options: {
        validate: {
            payload: {
                email: Joi.string().required(),
                username : Joi.string(),
                password : Joi.string().min(8)
            }
        },
    },
    options : {
        description: 'API for user login',
        notes: 'Returns email, username, password ',
        tags: ['api'], // ADD THIS TAG
    },
    handler: handler.login
}
module.exports = [root, register, login]