const User = require('../models/user.modal');
const Order = require('../models/order.modal');
const Product = require('../models/product.modal');
const Contact = require('../models/contact.modal');
const roles = require('../configs/roles');
const {
	orderPaymentStatus,
	orderTransportStatus,
	filterStatisticalTablesTime
} = require('../configs/settings');
const moment = require('moment');
const { reduceRevenueData, reduceProductSaleData } = require('../utils/reduceRevenueData');

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

/**
 *
 * @param {String} time
 */
const getDataStatisticsTable = async (time = 'year') => {
	const revenueData = await Promise.all(
		filterStatisticalTablesTime[time].map(i => {
			const startOfMonth = moment().subtract(i, 'months').startOf('month').toDate();
			const endOfMonth = moment().subtract(i, 'months').endOf('month').toDate();
			return Order.find({
				createdAt: {
					$gte: startOfMonth,
					$lt: endOfMonth
				}
			}).then(orders => {
				return {
					totalRevenue: reduceRevenueData(orders),
					totalProductSale: reduceProductSaleData(orders),
				};
			});
		})
	);

	return revenueData;
};

module.exports = {
	getIntegratedStatistics,
	getDataStatisticsTable
};
