const sql = require('mssql');
const { config } = require('../config/sqlConfig');
const pool = new sql.ConnectionPool(config);
const validateCategoriesSchema = require('../Services/categoriesValidation')
module.exports = {
    getAllcategory: async(req, res) => {
        try {
            await pool.connect();
            const result = await pool.request().execute('GetCategories');
            if (result.rowsAffected.length) res.json({ success: true, message: 'Category retrieved successfully' })
        } catch (error) {
            res.status(500).json(`Get All Categories Error: ${error}`);
        }
    },
    updateCategory: async(req, res) => {
        const { category } = req.body;
        const { id } = req.params;
        try {
            await pool.connect();
            let animal = validateCategoriesSchema(category);
            const result = await pool.request()
                .input("id", id)
                .input('name', animal.category)
                .execute('Update_Category');
            console.log(result);
            if (result.rowsAffected.length) res.json({ success: true, message: 'Category updated successfully' })
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

        try {
            // validate the content 
            let value = await validateCategoriesSchema(details)
            console.log(value)
            await pool.connect();
            let results = await pool.request()
                .input("name", value.category)
                .execute('AddCategory')
            console.log(results.recordset);
            res.json({ success: true, message: 'Category created successfully' })

        } catch (error) {
            res.status(500).json({ success: false, message: `Error creating category ${error}` })
        }
    }
}