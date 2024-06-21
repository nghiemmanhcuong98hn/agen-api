const httpStatus = require('http-status');
const xlsx = require('xlsx');
const messages = require('../configs/messages');
const ApiError = require('../utils/ApiError');

/**
 * export file excel
 * @param {Array} data
 * @return {Object} excelBuffer
 */
const exportFileExcel = (data, res) => {
	const workbook = xlsx.utils.book_new();
	const worksheet = xlsx.utils.json_to_sheet(data);
	xlsx.utils.book_append_sheet(workbook, worksheet, 'data');
	const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
	res.setHeader('Content-Disposition', 'attachment; filename=accounts.xlsx');
	res.setHeader(
		'Content-Type',
		'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
	);
	return excelBuffer;
};

/**
 * import excel
 * @param {File} file
 * @return {Array} users
 */
const importExcel = file => {
	if (!file) {
		throw new ApiError(httpStatus.BAD_REQUEST, messages.validate.required.file);
	}
	const filePath = file.path;
	const workbook = xlsx.readFile(filePath);
	const sheetNames = workbook.SheetNames;
	const sheet = workbook.Sheets[sheetNames[0]];

	const data = xlsx.utils.sheet_to_json(sheet);
	return data
};

module.exports = {
	exportFileExcel,
	importExcel
};
