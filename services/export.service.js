const xlsx = require('xlsx');

/**
 * export file excel
 * @param {Array} data
 * @param {Object} res
 */
const exportFileExcel = (data,res) => {
	const workbook = xlsx.utils.book_new();
	const worksheet = xlsx.utils.json_to_sheet(data);
	xlsx.utils.book_append_sheet(workbook, worksheet, 'data');
	const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    res.setHeader('Content-Disposition', 'attachment; filename=accounts.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	return excelBuffer;
};

module.exports = {
    exportFileExcel
}