//Educations routes
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const jobController = require('../controllers/jobController');
const auth = require('../middlewares/auth');

//Crud for jobs
// api/v1/jobs
router.post('/', auth,
    [
        check('role', "Job's position must be supplied").not().isEmpty(),
        check('company', "Company's name must be supplied").not().isEmpty()
    ],
    jobController.createJob);
// router.get('/', auth, jobController.getJob);
router.put('/:id', auth,     
    [
        check('role', "Job's position must be supplied").not().isEmpty(),
        check('company', "Company's name must be supplied").not().isEmpty()
    ],
    jobController.updateJob
);
router.delete('/:id', auth, jobController.deleteJob )
module.exports = router;