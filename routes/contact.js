const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const contactController = require('./../controllers/contactController');

router.post('/',
    [
        check('name', 'Name can not be empty').not().isEmpty(),
        check('email', 'Email can not be empty').not().isEmpty(),
        check('message', 'Message can not be empty').not().isEmpty()
    ], 
contactController.contactSend);

module.exports = router;