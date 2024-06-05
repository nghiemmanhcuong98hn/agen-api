const express = require('express');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/auth.validation');
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', validate(userValidation.register), userController.createUser);
router.post('/login', validate(userValidation.register), authController.login);

module.exports = router;
