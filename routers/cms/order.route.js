const express = require('express');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');
const router = express.Router();

router.get('/', validate(orderValidation.list), orderController.listOrders);
router.get('/:orderId', orderController.detailOrder);

module.exports = router;
