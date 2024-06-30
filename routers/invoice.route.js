const express = require('express');
const invoiceController = require('../controllers/invoice.controller');
const router = express.Router();

router.get('/export/:invoiceId', invoiceController.exportInvoice);

module.exports = router;
