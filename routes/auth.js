//User's routes
const express = require('express');
const { check, oneOf } = require('express-validator');
const router = express.Router();
const usersControllers = require('./../controllers/usersController');