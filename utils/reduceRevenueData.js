const reduceRevenueData = orders => {
	return orders.reduce(
		(init, order) =>
			init +
			order.products.reduce(
				(sum, product) => sum + product?.productId?.price * product?.quantity,
				0
			),
		0
	);
};

const reduceProductSaleData = orders => {
	return orders.reduce(
		(init, order) => init + order.products.reduce((sum, product) => sum + product?.quantity, 0),
		0
	);
};

module.exports = {
	reduceRevenueData,
	reduceProductSaleData
};
