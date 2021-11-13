//Educations routes
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const courseController = require('../controllers/courseController');
const auth = require('../middlewares/auth');

//Crud for courses (aka certs)
// api/v1/courses
router.post('/', auth,
    [
        check('title', "Certificate's title must be supplied").not().isEmpty(),
        check('institution', "Institution's name must be supplied").not().isEmpty()
    ],
    courseController.createCourse);

router.put('/:id', auth,     
    [
        check('title', "Certificate's title must be supplied").not().isEmpty(),
        check('institution', "Institution's name must be supplied").not().isEmpty()
    ],
    courseController.updateCourse
);
router.delete('/:id', auth, courseController.deleteCourse )
module.exports = router;