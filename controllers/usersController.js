const User = require('./../models/Users');
const bcryptjs = require('bcryptjs');
const utils = require('../utilities');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.newUser = async (req, res) => {
    const validation = validationResult(req);
    if(!validation.isEmpty()){
        const errors = utils.errorValidationHandler(validation);
        return res.status(400).json({errors: errors});
    }

    try {
        //Create new user
        //Hash password
        const { password } = req.body;
        const salt = await bcryptjs.genSalt(10);
        const passwordHashed = await bcryptjs.hash(password, salt);
        req.body.password = passwordHashed;
        const user = new User(req.body);
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
            res.json({ token })
        });
        res.status(200).json({msg: 'Successfuly registered!'});
    } catch (error) {
        console.log(error);
        const errors = utils.errorResponseHandler(error);
        res.status(400).json({errors: errors});
    }
}