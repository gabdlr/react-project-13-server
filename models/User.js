const mongoose = require('mongoose');
const UserSchema = mongoose.Schema(
    {
    name: {
        type: "String",
        required: [true, "Name can not be empty"],
        trim: true
    },
    lastname: {
        type: "String",
        required: [true, "Lastname can not be empty"],
        trim: true
    },
    picture:{
        type: "String",
        default: '/assets/img/profile/default.png',
        trim: true
    },
    email: {
        type: "String",
        required: [true, "Email can not be empty"],
        trim: true,
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
        required: false,
        trim: true
    },
    hobbies:{
        type: "String",
        required: false,
        trim: true
    },
    social:{
        linkedin_url: { type: "string", required: false, trim: true},
        github_url: {type: "string", required: false, trim: true},
        twitter_url: {type: "string", required: false, trim: true}
    },
    register:{
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('User', UserSchema);