const User = require('./../models/User');
const { validationResult } = require('express-validator');
const utils = require('../utilities');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.newUser = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = utils.errorValidationHandler(validation);
        return res.status(400).json(errors);
    }
    try {
        //Extract email, password
        let { email, password } = req.body;
        //Check email is unique (long story)
        const userEmail = await User.findOne({ email });
        if(userEmail) {
            return res.status(400).json({ errors: "This email has been already taken"});
        }
        //Create user
        const user = new User(req.body);
        //Hash password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);
        //Save user
        await user.save();
        //Save and sign JWT
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, process.env.SECRET_WORD, {
            expiresIn: 1200
        }, (error, token) => {
            if(error) throw error;
            res.status(200).json(token);
        });
    } catch (error) {
        console.log(error);
        const errors = utils.errorResponseHandler(error);
        res.status(400).json({errors: errors});
    }
}