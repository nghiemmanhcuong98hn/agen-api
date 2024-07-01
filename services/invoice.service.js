const fs = require('fs');
const ejs = require('ejs');
const httpStatus = require('http-status');
const randomstring = require('randomstring');
const { default: mongoose } = require('mongoose');
const Invoice = require('../models/invoice.modal');
const messages = require('../configs/messages');
const shopService = require('../services/shop.service');
const orderService = require('../services/order.service');
const ApiError = require('../utils/ApiError');
const { getTotalAmountOrder } = require('../utils/getTotalAmountOrder');

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
	await invoice.updateOne({ isExported: true });
	return html;
};

/**
 *
 * @param {ObjectId} orderId
 * @returns {Promise<Invoice>}
 */
const createInvoice = async orderId => {
	const invoiceNumber = randomstring.generate({
		length: 8,
		charset: 'numeric'
	});
	const order = await orderService.getOrderById(orderId);
	const invoiceBody = {
		invoiceNumber,
		customerName: order?.name,
		customerEmail: order?.email,
		customerPhone: order?.phone,
		customerAddress: order?.address.detail,
		products: order?.products,
		totalAmount: getTotalAmountOrder(order?.products)
	};
	return await Invoice.create(invoiceBody);
};

/**
 * get List Invoice
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Invoice>}
 */
const getListInvoice = async (filter, options) => {
	return Invoice.paginate(filter, options);
};

module.exports = {
	exportInvoice,
	createInvoice,
	getListInvoice
};
