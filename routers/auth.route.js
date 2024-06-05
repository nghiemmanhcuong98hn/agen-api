const express = require('express');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/auth.validation');
const userController = require('../controllers/user.controller');
const router = express.Router();

router.post('/register', validate(userValidation.register), userController.createUser);

module.exports = router;
