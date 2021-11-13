//Educations routes
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const stackController = require('../controllers/stackController');
const auth = require('../middlewares/auth');

//Crud for stack (aka skills)
// api/v1/stack
router.post('/', auth,
    [
        check('technology', "Skill's name must be supplied").not().isEmpty(),
        check('expertise', "Skill's level must be supplied").not().isEmpty()
    ],
    stackController.createStack);

router.put('/:id', auth,     
    [
        check('technology', "Skill's name must be supplied").not().isEmpty(),
        check('expertise', "Skill's level must be supplied").not().isEmpty()
    ],
    stackController.updateStack);

router.delete('/:id', auth, stackController.deleteStack )
module.exports = router;