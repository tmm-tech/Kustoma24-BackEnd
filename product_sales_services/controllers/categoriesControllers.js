const sql = require('mssql');
const { config } = require('../config/sqlConfig');
const pool = new sql.ConnectionPool(config);
const validateCategoriesSchema = require('../services/categoriesValidation')
module.exports = {
    getAllcategory: async(req, res) => {
        try {
            await pool.connect();
            const result = await pool.request().execute('GetCategories');
            if (result.rowsAffected.length) res.json({ success: true, message: 'Category retrieved successfully', data: result })
        } catch (error) {
            res.status(500).json(`Get All Categories Error: ${error}`);
        }
    },
    updateCategory: async(req, res) => {
        const { category } = req.body;
        const { id } = req.params;
        try {
            await pool.connect();
            // let value = validateCategoriesSchema(details);
            const result = await pool.request()
                .input("id", id)
                .input('name', category)
                .execute('Update_Category');
            if (result.rowsAffected.length) res.json({ success: true, message: 'Category updated successfully', data: result.recordset })
        } catch (error) {
            console.log(error)
        }

    },
    SoftDeletecategory: async(req, res) => {
        const { id } = req.params
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id).execute('Remove_Category');
            if (result.rowsAffected.length) res.json({ success: true, message: 'Category deleted successfully' })
        } catch (error) {
            res.status(500).json(`Remove Category Error: ${error}`);
        }
    },
    createcategory: async(req, res) => {
        const details = req.body;
        const { role } = req.params;
        let categoryStatus = 0;
        try {
            // validate the content

            if (role === 'SuperAdmin' || role === 'Admin') {
                categoryStatus = 1;
            }
            let value = await validateCategoriesSchema(details)
            try {
                // determine the category status based on the user role
                await pool.connect();
                let results = await pool.request()
                    .input("name", value.category)
                    .input("status", categoryStatus)
                    .execute('AddCategory');
                console.log(results);
                res.json({ success: true, message: 'Category created successfully', data: results.recordset });
            } catch (error) {
                res.status(500).json({ success: false, message: `Error creating category ${error}` })
            }

        } catch (error) {
            res.status(500).json({ success: false, message: `Error creating category ${error}` })
        }
    },
    updateCategoryStatus: async(req, res) => {
        const { status } = req.body;
        const { id } = req.params;
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id)
                .input('status', status)
                .execute('UpdateCategory_Status');
            console.log(result);
            if (result.rowsAffected.length) res.json({ success: true, message: 'Category updated successfully', data: result.recordset })
        } catch (error) {
            console.log(`Status Error ${error}`)
        }

    },
}