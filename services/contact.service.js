const { default: mongoose } = require('mongoose');
const Contact = require('../models/contact.modal');
const messages = require('../configs/messages');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * get contact by id
 * @param {ObjectId} id
 * @returns {Promise<Contact>}
 */
const getContactById = async contactId => {
	if (!mongoose.Types.ObjectId.isValid(contactId)) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.contact_notfound);
	}
	const contact = await Contact.findById(contactId);
	if (!contact) {
		throw new ApiError(httpStatus.NOT_FOUND, messages.validate.contact_notfound);
	}
	return contact;
};

/**
 * create contact
 * @param {Object} body
 * @param {Object} image
 * @returns {Promise<Contact>}
 */
const createContact = async (body,image) => {
	if(image) body.image = image.path;
	return await Contact.create(body);
};

/**
 * update status contact
 * @param {ObjectId} contactId
 * @param {Boolean} isReply
 * @returns {Promise<Brand>}
 */
const updateStatusContact = async (contactId, isReply) => {
	const contact = await getContactById(contactId);
	return await contact.updateOne({ isReply });
};

/**
 * delete brand
 * @param {String} deleteBy
 * @param {String} contactId
 * @return {Promise<Contact>}
 */
const deleteContact = async (deleteBy, contactId) => {
	const contact = await getContactById(contactId);
	return await contact.delete(deleteBy);
};

/**
 * destroy contact
 * @param {String} contactId
 * @return {Promise<Contact>}
 */
const destroyContact = async contactId => {
	return await Contact.deleteOne({ _id: contactId });
};

/**
 * get list contacts
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Contact[]>}
 */
const getListContacts = async (filter, options) => {
	return Contact.paginate(filter, options);
};

/**
 * get list trash contacts
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Contact[]>}
 */
const getListTrashContacts = async (filter, options) => {
	// The 3rd argument allows getting only the middle trash list
	return Contact.paginate(filter, options, true);
};

/**
 * restore contact
 * @param {String} contactId
 * @return {Promise<>}
 */
const restoreContact = async contactId => {
	return await Contact.restore({ _id: contactId });
};

module.exports = {
	getListContacts,
	createContact,
	updateStatusContact,
	deleteContact,
	getListTrashContacts,
	getContactById,
	destroyContact,
	restoreContact
};
