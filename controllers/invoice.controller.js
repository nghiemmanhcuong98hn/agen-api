const httpStatus = require('http-status');
const pdf = require('html-pdf');
const catchAsync = require('../utils/catchAsync');
const invoiceService = require('../services/invoice.service');

const exportInvoice = catchAsync(async (req, res) => {
	const invoiceId = req.params.invoiceId;
	const html = await invoiceService.exportInvoice(invoiceId);
	pdf.create(html, {
		format: 'A4', 
		orientation: 'portrait',
	}).toStream((err, stream) => {
		res.setHeader('Content-type', 'application/pdf');
		// res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
		stream.pipe(res);
	});
});

module.exports = {
	exportInvoice
};
