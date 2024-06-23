const httpStatus = require('http-status');
const { filterTypes } = require('../configs/settings');
const catchAsync = require('../utils/catchAsync');
const brandService = require('../services/brand.service');
const fileService = require('../services/file.service');
const { pickFilter, pick } = require('../utils/pick');

const listBrands = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [{ key: 'name', type: filterTypes.search }, 'char']);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const brands = await brandService.getListBrands(filter, options);
	res.status(httpStatus.OK).send(brands);
});

const createBrand = catchAsync(async (req, res) => {
	const body = req.body;
	const brand = await brandService.createBrand(body);
	res.status(httpStatus.CREATED).send(brand);
});

const updateBrand = catchAsync(async (req, res) => {
	const brandId = req.params.brandId;
	const brand = await brandService.updateBrand(brandId, req.body);
	res.status(httpStatus.OK).send(brand);
});

const deleteBrand = catchAsync(async (req, res) => {
	await brandService.deleteBrand(req.userId, req.params.brandId);
	res.status(httpStatus.OK).send(true);
});

const destroyBrand = catchAsync(async (req, res) => {
	await brandService.destroyBrand(req.params.brandId);
	res.status(httpStatus.OK).send(true);
});

const listTrashBrands = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [{ key: 'name', type: filterTypes.search }, 'char']);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const brands = await brandService.getListTrashBrands(filter, options);
	res.status(httpStatus.OK).send(brands);
});

const detailBrand = catchAsync(async (req, res) => {
	const brandId = req.params.brandId;
	const brand = await brandService.getBrandById(brandId);
	res.status(httpStatus.OK).send(brand);
});

const importBrands = catchAsync(async (req, res) => {
	const errors = await brandService.importBrands(req.file);
	if (errors.length > 0) {
		res.status(httpStatus.CONFLICT).send({
			data: errors
		});
	} else {
		res.status(httpStatus.OK).send(true);
	}
});

const exportBrands  = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [{ key: 'name', type: filterTypes.search }, 'char']);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const brands = await brandService.getListBrandExport(filter, options);
	const excelBuffer = await fileService.exportFileExcel(brands,res)
	res.send(excelBuffer);
})

const restoreBrand = catchAsync(async (req, res) => {
	const brandId = req.params.brandId;
	await brandService.restoreBrand(brandId);
	res.status(httpStatus.OK).send(true);
});

module.exports = {
	listBrands,
	createBrand,
	updateBrand,
	deleteBrand,
	listTrashBrands,
	detailBrand,
	destroyBrand,
	importBrands,
	exportBrands,
	restoreBrand
};
