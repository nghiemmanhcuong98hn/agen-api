const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const makeOptions = require('../utils/makeOptions');
const Product = require('../models/product.modal');
const messages = require('../configs/messages');

/**
 * get List Product
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Product>}
 */
const getListProducts = async (filter, options) => {
	return Product.paginate(filter, options);
};

module.exports = {
      getListProducts
}