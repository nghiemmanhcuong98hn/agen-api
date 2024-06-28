const Shop = require('../models/shop.modal');

/**
 * @returns {Promise<Shop>}
 */
const getShop = async () => {
	return await Shop.findOne({}, {});
};

/**
 * @param {Object} body
 * @returns {Promise<Shop>}
 */
const createShop = async body => {
	return await Shop.create(body);
};

/**
 * @param {Object} body
 * @returns {Promise<Shop>}
 */
const updateShop = async body => {
	const shopInfo = await Shop.findOne({}, {});
	return await Shop.findByIdAndUpdate(shopInfo?._id, body, { new: true });
};

module.exports = {
	createShop,
	updateShop,
	getShop
};
