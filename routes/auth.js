//User's routes
const express = require('express');
const router = express.Router();
const { check, oneOf } = require('express-validator');
const auth = require('../middlewares/auth');
const authControllers = require('./../controllers/authController');

//Users authentication
// api/v1/auth
router.post('/',
    oneOf(
    [
        check('email', 'Email can not be empty').not().isEmpty(),
        check('password', 'Password can not be empty').not().isEmpty(),
        check('email', 'Email must be a valid email address').isEmail()
    ],
    [
        check('email', 'Email must be a valid email address').isEmail(),
    ]
    ),
    authControllers.authenticateUser
);

router.get('/', 
    auth,
    authControllers.authenticatedUser
);
module.exports = router;