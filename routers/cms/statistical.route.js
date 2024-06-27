const express = require('express');
const validate = require('../../middlewares/validate');
const statisticalController = require('../../controllers/statistical.controller');
const router = express.Router();

router.get('/integrated', statisticalController.getIntegratedStatistics);
router.get('/table', statisticalController.getDataStatisticsTable);

module.exports = router;
