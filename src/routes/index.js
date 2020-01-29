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
        description: 'Get test message',
        notes: 'Returns a message ',
        tags: ['api'], // ADD THIS TAG
        response: {
            status: {
                200: Joi.object({ message: "hello" }),
                400: validationError,
                500: error
            },
            failAction: async (req, h, err) => {
                if (err) {
                    console.log(`Server error: ${err}`)
                }
            }
        }
    },
    // options : {
    //     description: 'Get test message',
    //     notes: 'Returns a message ',
    //     tags: ['api'], // ADD THIS TAG
    // },
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
<<<<<<< HEAD
            payload: {
                email: Joi.string().required(),
                username: Joi.string().required(),
                password: Joi.string().min(8)
            }
=======
            payload: Joi.object({
                    email: Joi.string().required(),
                    username : Joi.string().required(),
                    password : Joi.string().min(8)
            })
>>>>>>> 42a97e2d3abcce61c448fd9c017a126262082afd
        },
        response: {
            status: {
                200: success,
                400: validationError,
                500: error
            },
            failAction: async (req, h, err) => {
                if (err) {
                    console.log(err)
                }
            }
        }
    },
    handler: handler.register
}

const login = {
    method: 'POST',
    path: '/user/login',

    options: {
        description: 'API for user login',
        notes: 'Returns email, username, password ',
<<<<<<< HEAD
        tags: ['api'], // ADD THIS TAG
=======
        tags: ['api'],
>>>>>>> 42a97e2d3abcce61c448fd9c017a126262082afd
        validate: {
            payload: {
                email: Joi.string().required(),
                password: Joi.string().min(8)
            }
        },
<<<<<<< HEAD
    },
    // options : {
    //     description: 'API for user login',
    //     notes: 'Returns email, username, password ',
    //     tags: ['api'], // ADD THIS TAG
    // },
=======
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
>>>>>>> 42a97e2d3abcce61c448fd9c017a126262082afd
    handler: handler.login
}
module.exports = [root, register, login]