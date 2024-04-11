const mongoose = require('mongoose')
const {Schema} = mongoose;

const userScheme = new Schema({

    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    }

})
const User = mongoose.model('User', userScheme);
module.exports = User