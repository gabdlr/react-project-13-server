//Educations routes
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const pictureController = require('../controllers/pictureController');


// api/v1/picture
router.put('/', auth, multer, pictureController.updatePicture);

module.exports = router;