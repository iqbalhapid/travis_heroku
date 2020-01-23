const Mongoose = require('mongoose')
const { Schema } = Mongoose

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email id is Required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    username: {
        type: String,
        required : [true, 'username is required'],
        unique: true
    }
})

const User = Mongoose.model('user', userSchema)
module.exports = {User}