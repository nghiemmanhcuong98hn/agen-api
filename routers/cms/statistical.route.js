const express = require('express');
const validate = require('../../middlewares/validate');
const statisticalController = require('../../controllers/statistical.controller');
const router = express.Router();

router.get('/integrated', statisticalController.getIntegratedStatistics);

module.exports = router;
