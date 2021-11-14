const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middlewares/auth');
const personalController = require('../controllers/personalController');

//Crud for personal info

router.put('/personal/', auth, 
    [
        check('name', "User's name can not be left blank").not().isEmpty(),
        check('lastname', "User's lastname can not be left blank").not().isEmpty()
    ],
    personalController.updateUserPersonal
);

router.put('/social/', auth, personalController.updateUserSocial);
router.put('/about/', auth, personalController.updateUserAbout)
router.put('/hobbies/', auth, personalController.updateUserHobbie);

module.exports = router;