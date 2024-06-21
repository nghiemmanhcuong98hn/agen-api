const express = require('express');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/product.validation');
const productController = require('../../controllers/product.controller');
const router = express.Router();

router.get('/', validate(productValidation.list), productController.listProducts);

module.exports = router;
