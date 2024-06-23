const httpStatus = require('http-status');
const { filterTypes } = require('../configs/settings');
const catchAsync = require('../utils/catchAsync');
const contactService = require('../services/contact.service');
const { pickFilter, pick } = require('../utils/pick');

const listContacts = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [
		{ key: 'name', type: filterTypes.search },
		{ key: 'createdAt', type: filterTypes.date },
		'email',
		'phone',
	]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const contacts = await contactService.getListContacts(filter, options);
	res.status(httpStatus.OK).send(contacts);
});

const listTrashContacts = catchAsync(async (req, res) => {
	const filter = pickFilter(req.query, [
		{ key: 'name', type: filterTypes.search },
		{ key: 'createdAt', type: filterTypes.date },
		'email',
		'phone',
	]);
	const options = pick(req.query, ['sortBy', 'limit', 'page']);
	const contacts = await contactService.getListTrashContacts(filter, options);
	res.status(httpStatus.OK).send(contacts);
});


const createContact = catchAsync(async (req, res) => {
	const body = req.body;
	const contact = await contactService.createContact(body,req.file);
	res.status(httpStatus.CREATED).send(contact);
});

const updateStatusContact = catchAsync(async (req, res) => {
	const contactId = req.params.contactId;
	await contactService.updateStatusContact(contactId, req.body?.isReply);
	res.status(httpStatus.OK).send(true);
});

const deleteContact = catchAsync(async (req, res) => {
	await contactService.deleteContact(req.userId, req.params.contactId);
	res.status(httpStatus.OK).send(true);
});

const destroyContact = catchAsync(async (req, res) => {
	await contactService.destroyContact(req.params.contactId);
	res.status(httpStatus.OK).send(true);
});

const detailContact = catchAsync(async (req, res) => {
	const contactId = req.params.contactId;
	const contact = await contactService.getContactById(contactId);
	res.status(httpStatus.OK).send(contact);
});

const restoreContact = catchAsync(async (req, res) => {
	const contactId = req.params.contactId;
	await contactService.restoreContact(contactId);
	res.status(httpStatus.OK).send(true);
});

module.exports = {
	listContacts,
	listTrashContacts,
	createContact,
	updateStatusContact,
	deleteContact,
	detailContact,
	destroyContact,
	restoreContact
};
