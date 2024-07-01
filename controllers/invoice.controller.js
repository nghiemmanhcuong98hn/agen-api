const httpStatus = require('http-status');
const pdf = require('html-pdf');
const catchAsync = require('../utils/catchAsync');
const { pickFilter, pick } = require('../utils/pick');
const { filterTypes } = require('../configs/settings');
const invoiceService = require('../services/invoice.service');

const exportInvoice = catchAsync(async (req, res) => {
	const invoiceId = req.params.invoiceId;
	const html = await invoiceService.exportInvoice(invoiceId);
	pdf.create(html, {
		format: 'A4',
		orientation: 'portrait'
	}).toStream((err, stream) => {
		res.setHeader('Content-type', 'application/pdf');
		// res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
		stream.pipe(res);
	});
});

const createInvoice = catchAsync(async (req, res) => {
	const orderId = req.body.orderId;
	const invoice = await invoiceService.createInvoice(orderId);
	res.status(httpStatus.CREATED).send(invoice);
});

const getListInvoice = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [
		{ key: 'name', type: filterTypes.search },
		{ key: 'email', type: filterTypes.search },
		{ key: 'phone', type: filterTypes.search },
		{ key: 'createdAt', type: filterTypes.date },
	]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const invoices = await invoiceService.getListInvoice(filter,options);
	res.status(httpStatus.OK).send(invoices);
});

module.exports = {
	exportInvoice,
	createInvoice,
	getListInvoice
};
