const User = require('../models/User');
const utils = require('../utilities');
const { validationResult } = require('express-validator');

//Update user personal information
exports.updateUserPersonal = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = utils.errorValidationHandler(validation);
        return res.status(400).json(errors);
    }

    const userPersonalNew = {}

    //Extract params pass it to the new object
    for(const key in req.body){
        userPersonalNew[key] = req.body[key];
    }

    try {
        //Check for record to exist
        //only a hacker would get these errors
        let userPersonal = await User.findById(req.user.id);

        //If it doesn't exist throw error
        if(!userPersonal){
            return res.status(404).json({msg: "This entry does not exist"});
        }

        //Update
        userPersonal = await User.findByIdAndUpdate(
            {_id: req.user.id}, 
            { $set : userPersonalNew}, 
            { new: true});
        res.status(200).json({msg: "Updated successfuly", registry:userPersonal});
    } catch (error) {
        res.status(500).json({msg: "Internal server error."});
    }
}

exports.updateUserSocial = async (req, res) => {

    const userSocialNew = {social:{}}

    //Extract params pass it to the new object
    for(const key in req.body){
        userSocialNew.social[key] = req.body[key];
    }

    try {
        //Check for record to exist
        //only a hacker would get these errors
        let userSocial = await User.findById(req.user.id);

        //If it doesn't exist throw error
        if(!userSocial){
            return res.status(404).json({msg: "This entry does not exist"});
        }

        //Update
        userSocial = await User.findByIdAndUpdate(
            {_id: req.user.id}, 
            { $set : userSocialNew}, 
            { new: true});
        res.status(200).json({msg: "Updated successfuly", registry: userSocial.social});
    } catch (error) {
        res.status(500).json({msg: "Internal server error."});
    }
}

exports.updateUserHobbie = async (req, res) => {

    //Nasty
    const userHobbieNew = req.body;

    try {
        //Check for record to exist
        //only a hacker would get these errors
        let userHobbie = await User.findById(req.user.id);

        //If it doesn't exist throw error
        if(!userHobbie){
            return res.status(404).json({msg: "This entry does not exist"});
        }

    //Update
    userHobbie = await User.findByIdAndUpdate(
        {_id: req.user.id}, 
        { $set : userHobbieNew}, 
        { new: true});
    res.status(200).json({msg: "Updated successfuly", registry: userHobbie.hobbies});
    } catch (error) {
        res.status(500).json({msg: "Internal server error."});
    }
}

exports.updateUserAbout = async (req, res) => {

    //Nasty
    const userAboutNew = req.body;
    try {
        //Check for record to exist
        //only a hacker would get these errors
        let userAbout = await User.findById(req.user.id);

        //If it doesn't exist throw error
        if(!userAbout){
            return res.status(404).json({msg: "This entry does not exist"});
        }

    //Update
    userAbout = await User.findByIdAndUpdate(
        {_id: req.user.id}, 
        { $set : userAboutNew}, 
        { new: true});
    res.status(200).json({msg: "Updated successfuly", registry: userAbout.about});
    } catch (error) {
        res.status(500).json({msg: "Internal server error."});
    }
}
