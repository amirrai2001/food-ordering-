const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: false,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
        min: 6,
        max: 50,
    },
    isAdmin: {
        type: Boolean,
        default: true,
    }
})

module.exports = mongoose.model("User", UserSchema)