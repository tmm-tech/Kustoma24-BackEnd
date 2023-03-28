const sql = require('mssql');
const { config } = require('../config/sqlConfig');
const pool = new sql.ConnectionPool(config);
const validateProductSchema = require('../../Services/productValidation')
module.exports = {
    getAllproduct: async(req, res) => {
        try {
            await pool.connect();
            const result = await pool.request().execute('getProduct');
            if (result.rowsAffected.length) res.json({ success: true, message: 'Products retrieved successfully', data: result })
        } catch (error) {
            res.status(500).json(`Get All Products Error: ${error}`);
        }
    },
    updateproduct: async(req, res) => {
        const details = req.body;
        const { id } = req.params;
        try {
            await pool.connect();
            // let value = validateCategoriesSchema(details);
            const result = await pool.request()
                .input("title", details.title)
                .input("price", details.price)
                .input("description", details.description)
                .input("category_id", details.category_id)
                .input("image", details.image)
                .input('id', id)
                .execute('Update_product');
            if (result.rowsAffected.length) res.json({ success: true, message: 'product updated successfully', data: result.recordset })
        } catch (error) {
            console.log(error)
        }

    },
    SoftDeleteproduct: async(req, res) => {
        const { id } = req.params
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id).execute('Remove_product');
            if (result.rowsAffected.length) res.json({ success: true, message: 'product deleted successfully' })
        } catch (error) {
            res.status(500).json(`Remove product Error: ${error}`);
        }
    },
    createproduct: async(req, res) => {
        const details = req.body;
        const { role } = req.params;
        let productStatus = 0;
        try {
            // validate the content

            if (role === 'SuperAdmin' || role === 'Admin') {
                productStatus = 1;
            }
            let value = await validateProductSchema(details)
            try {
                // determine the product status based on the user role
                await pool.connect();
                let results = await pool.request()
                    .input("title", value.title)
                    .input("price", value.price)
                    .input("description", value.description)
                    .input("category_id", value.category_id)
                    .input("image", value.image)
                    .input("rate", value.rate)
                    .input("count", value.count)
                    .input("status", productStatus)
                    .execute('Addproduct');
                console.log(results);
                res.json({ success: true, message: 'product created successfully', data: results.recordset });
            } catch (error) {
                res.status(500).json({ success: false, message: `Error creating product ${error}` })
            }

        } catch (error) {
            res.status(500).json({ success: false, message: `Error creating product ${error}` })
        }
    },
    updateproductStatus: async(req, res) => {
        const { status } = req.body;
        const { id } = req.params;
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id)
                .input('status', status)
                .execute('UpdateProduct_Status');
            console.log(result);
            if (result.rowsAffected.length) res.json({ success: true, message: 'product updated successfully', data: result.recordset })
        } catch (error) {
            console.log(`Status Error ${error}`)
        }

    },
}