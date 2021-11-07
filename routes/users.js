//User's routes
const express = require('express');
const { check, oneOf } = require('express-validator');
const router = express.Router();
const usersControllers = require('./../controllers/usersController')
//New user
// api/v1/user
router.post('/',
    oneOf(
    [   
        check('name', 'Name can not be empty').not().isEmpty(),
        check('lastname', 'Lastname can not be empty').not().isEmpty(),
        check('email', 'Email can not be empty').not().isEmpty(),
        check('password', 'Password can not be empty').not().isEmpty(),
        check('password', 'Password can not be empty').not().isEmpty()
    ],
    [
        check('email', 'Email must be a valid email address').isEmail(),
        check('password', 'Password must be at least 6 characters long').isLength({min: 6})
    ]
    ),
    usersControllers.newUser
    );
module.exports = router;
