const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
}, {timestamps:true})

const User = model("user", userSchema)

module.exports = { User }