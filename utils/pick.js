const { filterTypes } = require('../configs/settings');

/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const pick = (object, keys) => {
	return keys.reduce((obj, key) => {
		if (object && Object.prototype.hasOwnProperty.call(object, key)) {
			// eslint-disable-next-line no-param-reassign
			obj[key] = object[key];
		}
		return obj;
	}, {});
};

const pickFilter = (object, filters) => {
	return filters.reduce((obj, filter) => {
		if (
			object &&
			(Object.prototype.hasOwnProperty.call(object, filter.key) ||
				Object.prototype.hasOwnProperty.call(object, filter))
		) {
			// eslint-disable-next-line no-param-reassign
			switch (filter.type) {
				case filterTypes.search:
					obj[filter.key] = { $regex: object[filter.key] ?? '', $options: 'i' };
					break;
				case filterTypes.date:
					const startDate = new Date(object[filter.key]);
					const endDate = new Date(object[filter.key]);
					endDate.setDate(endDate.getDate() + 1);
					obj[filter.key] = { $gte: startDate, $lt: endDate };
					break;
				default:
					obj[filter] = object[filter];
					break;
			}
		}
		return obj;
	}, {});
};

module.exports = {
	pick,
	pickFilter
};
