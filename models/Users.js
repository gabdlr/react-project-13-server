const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
    {
    name: {
        type: "String",
        required: [true, "Name can not be empty"],
    },
    lastname: {
        type: "String",
        required: [true, "Lastname can not be empty"]
    },
    picture:{
        type: "String",
        default: '/assets/img/profile/default.png'
    },
    email: {
        type: "String",
        required: [true, "Email can not be empty"],
        unique: true
    },
    password: {
        type: "String",
        required: [true, "Password can not be empty"],
        trim: true
    },
    title: {
        type: "String",
        required: false,
        trim: true
    },
    about: {
        type: "String",
        required: false
    },
    hobbies:{
        type: "String",
        required: false
    },
    social:{
        linkedin_url: { type: "string", required: false},
        github_url: {type: "string", required: false},
        twitter_url: {type: "string", required: false}
    },
    register:{
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('User', UserSchema);