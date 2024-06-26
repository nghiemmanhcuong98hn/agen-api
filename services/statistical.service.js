const User = require('../models/user.modal');
const Order = require('../models/order.modal');
const Product = require('../models/product.modal');
const Contact = require('../models/contact.modal');
const roles = require('../configs/roles');
const { orderPaymentStatus, orderTransportStatus } = require('../configs/settings');

/**
 * @returns {Object}
 */
const getIntegratedStatistics = async () => {
	const countUser = await User.countDocuments({ role: roles.user });
	const countProduct = await Product.countDocuments();
	const countContact = await Contact.countDocuments({ isReply: false });
	const countOrder = await Order.countDocuments({
		$or: [
			{ paymentStatus: orderPaymentStatus.confirm },
			{ transportStatus: orderTransportStatus.confirm }
		]
	});

	return {
		countUser,
		countProduct,
		countContact,
		countOrder
	};
};

const getDataStatisticsTable = async () => {
	
}

module.exports = {
      getIntegratedStatistics
}
