const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const contactController = require('./../controllers/contactController');

router.post('/',
    [
        check('name', 'Name can not be empty').not().isEmpty(),
        check('email', 'Email can not be empty').not().isEmpty(),
        check('email', 'Email must be a valid email address').not().isEmail(),
        check('message', 'Message can not be empty').not().isEmpty()
    ], 
contactController.contactSend);

module.exports = router;