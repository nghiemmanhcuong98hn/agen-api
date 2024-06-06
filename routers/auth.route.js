const express = require('express');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.post('/register', validate(userValidation.register), authController.register);
router.post('/login', validate(userValidation.login), authController.login);

module.exports = router;
