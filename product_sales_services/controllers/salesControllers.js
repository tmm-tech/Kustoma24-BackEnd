const sql = require('mssql');
const { config } = require('../config/sqlConfig');
const pool = new sql.ConnectionPool(config);
const validateSalesSchema = require('../services/salesValidation')
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
    createSale: async(req, res) => {
        const details = req.body;

        try {
            await pool.connect();
            let value = await validateProductSchema(details)
            let results = await pool.request()
                .input("date", value.date)
                .input("product_ids", value.product_ids)
                .input("quantities", value.quantities)
                .input("prices", value.prices)
                .input("customer_id", value.customer_id)
                .input("discount", value.discount)
                .input("payment_method", value.payment_method)
                .execute('AddSale');
            console.log(results);
            res.json({ success: true, message: 'Sale created successfully', data: results.recordset });
        } catch (error) {
            res.status(500).json(`Create Sales Error: ${error}`);
        }
    },
    Salestatus: async(req, res) => {
        const { status } = req.body;
        try {

        } catch (error) {
            res.status(500).json(`Sales  status change Error: ${error}`);
        }
    }

};