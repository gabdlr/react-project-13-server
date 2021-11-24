//User's routes
const express = require('express');
const router = express.Router();
const { check, oneOf } = require('express-validator');
const usersControllers = require('../controllers/usersController')
//Creates new user
// api/v1/user
router.post('/',
    oneOf(
    [   
        check('name', 'Name can not be empty').not().isEmpty(),
        check('lastname', 'Lastname can not be empty').not().isEmpty(),
        check('email', 'Email can not be empty').not().isEmpty(),
        check('password', 'Password must be at least 6 characters long').isLength({min:6})
    ],
    [
        check('email', 'Email must be a valid email address').isEmail(),
    ]
    ),
    usersControllers.newUser );

router.get('/All', usersControllers.listAll)    
module.exports = router;
