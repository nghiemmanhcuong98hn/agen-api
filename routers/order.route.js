const express = require('express');
const validate = require('../middlewares/validate');
const orderValidation = require('../validations/order.validation');
const orderController = require('../controllers/order.controller');
const router = express.Router();

router.post('/', validate(orderValidation.create), orderController.createOrder);

module.exports = router;
