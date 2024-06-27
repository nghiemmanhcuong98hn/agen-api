const httpStatus = require('http-status');
const { filterTypes } = require('../configs/settings');
const catchAsync = require('../utils/catchAsync');
const statisticalService = require('../services/statistical.service');
const fileService = require('../services/file.service');
const { pickFilter, pick } = require('../utils/pick');

const getIntegratedStatistics = catchAsync(async (req, res) => {
	const data = await statisticalService.getIntegratedStatistics();
	res.status(httpStatus.OK).send({ data });
});

const getDataStatisticsTable = catchAsync(async (req, res) => {
	const data = await statisticalService.getDataStatisticsTable();
	res.status(httpStatus.OK).send({ data });
});

module.exports = {
	getIntegratedStatistics,
	getDataStatisticsTable
};
