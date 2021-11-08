//Educations routes
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const educationController = require('../controllers/educationController');
const auth = require('../middlewares/auth');

//Crud for education
// api/v1/education
router.post('/', auth,
    [
        check('institution', "Institution's name must be supplied").not().isEmpty(),
        check('degree', "Degree's name must be supplied").not().isEmpty(),
        check('state', 'Current state must be informed').not().isEmpty()
    ],
    educationController.createEducation);
router.get('/', auth, educationController.getEducation);
router.put('/:id', auth,     
    [
        check('institution', "Institution's name must be supplied").not().isEmpty(),
        check('degree', "Degree's name must be supplied").not().isEmpty(),
        check('state', 'Current state must be informed').not().isEmpty()
    ],
    educationController.updateEducation
);
router.delete('/:id', auth, educationController.deleteEducation )
module.exports = router;