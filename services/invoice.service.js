const Invoice = require('../models/invoice.modal');
const ejs = require('ejs');
const fs = require('fs');

const exportInvoice = async invoiceId => {
	const template = fs.readFileSync('templates/invoice.ejs', 'utf8');
	const html = ejs.render(template, {
		users: [
			{ id: 1, name: 'cuong', email: 'cuong@gmail.com' },
			{ id: 1, name: 'cuong', email: 'cuong@gmail.com' },
			{ id: 1, name: 'cuong', email: 'cuong@gmail.com' }
		]
	});
	return html;
};

module.exports = {
	exportInvoice
};
