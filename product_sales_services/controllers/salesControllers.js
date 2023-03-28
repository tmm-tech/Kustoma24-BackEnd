const sql = require('mssql');
const { config } = require('../config/sqlConfig');
const pool = new sql.ConnectionPool(config);
const validateSalesSchema = require('../Services/salesValidation')
module.exports = {
    getAllSales: async(req, res) => {
        try {
            await pool.connect();
            const result = await pool.request().execute('GetSales');
            if (result.rowsAffected.length) res.json({ success: true, message: 'Sales retrieved successfully', data: result })
        } catch (error) {
            res.status(500).json(`Get All Sales Error: ${error}`);
        }
    },
};