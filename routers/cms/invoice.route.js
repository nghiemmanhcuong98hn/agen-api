const express = require('express');
const validate = require('../../middlewares/validate');
const invoiceController = require('../../controllers/invoice.controller');
const invoiceValidation = require('../../validations/invoice.validation');
const router = express.Router();

router.get('/', validate(invoiceValidation.list), invoiceController.getListInvoice);
router.post('/', validate(invoiceValidation.create), invoiceController.createInvoice);

module.exports = router;
