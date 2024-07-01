const getTotalAmountOrder = products => {
	if (!products || products.length === 0) return 0;

	const total = products.reduce((init, product) => {
		return init + product.quantity * product.productId.price;
	}, 0);
	return total;
};

module.exports = {
	getTotalAmountOrder
};
