const User = require('./../models/User');
const { validationResult } = require('express-validator');
const utils = require('../utilities');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = utils.errorValidationHandler(validation);
        return res.status(400).json({msg: errors});
    }

    //Extract data
    const { email, password } = req.body;
    try {
        //Search for email to be registered
        let user = await User.findOne({ email });
        if(!user){
            const errors = ["There's an error in the information you've provided"];
            return res.status(400).json({msg: errors});
        }
        //Check password
        const passwordCheck = await bcryptjs.compare(password, user.password);
        if(!passwordCheck){
            const errors = ["There's an error in the information you've provided"];
            return res.status(400).json({msg: errors});
        }
        //Everything is ok, generate token
        //Save and sign JWT
        const payload = { user: { id: user.id } };
        let authtoken;
        jwt.sign(payload, process.env.SECRET_WORD, {
            expiresIn: 1200
        }, (error, token) => {
            if(error) throw error;
            res.status(200).json(token);
        });
    } catch (error) {
        res.status(500).json(error);   
    }
}

//Gets authenticated user information
exports.authenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        .select('-email -password -title -about -hobbies -social -register -__v');
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error);   
    }
}