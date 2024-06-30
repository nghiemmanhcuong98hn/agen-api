const fs = require('fs');
const ejs = require('ejs');
const httpStatus = require('http-status');
const { default: mongoose } = require('mongoose');
const Invoice = require('../models/invoice.modal');
const messages = require('../configs/messages');
const shopService = require('../services/shop.service');
const ApiError = require('../utils/ApiError');

/**
 *
 * @param {Object} invoiceId
 * @returns {Promise<Invoice>}
 */
const getInvoiceById = async invoiceId => {
	if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.invoice_notfound);
	}

	const invoice = await Invoice.findById(invoiceId);
	if (!invoice) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.invoice_notfound);
	}
	return invoice;
};

/**
 *
 * @param {Object} invoiceId
 * @returns
 */
const exportInvoice = async invoiceId => {
	const invoice = await getInvoiceById(invoiceId);
	const shop = await shopService.getShop();
	const template = fs.readFileSync('templates/invoice.ejs', 'utf8');
	const html = ejs.render(template, {
		shopName: shop?.name,
		shopAddress: shop?.address,
		shopPhone: shop?.phone,
		shopEmail: shop?.email,
		shopWebsiteUrl: shop?.websiteUrl,
		products: invoice?.products,
		customerName: invoice?.customerName,
		customerEmail: invoice?.customerEmail,
		customerPhone: invoice?.customerPhone,
		customerAddress: invoice?.customerAddress,
		totalAmount: invoice?.totalAmount
	});
	return html;
};

module.exports = {
	exportInvoice
};
