const express = require('express');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');
const verifyToken = require('../../middlewares/verifyToken')
const router = express.Router();

router.get('/', verifyToken,validate(userValidation.listUser), userController.listUsers);

module.exports = router;
