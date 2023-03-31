const sql = require('mssql');
const { config } = require('../config/sqlConfig');
const bcrypt = require('bcrypt');
const pool = new sql.ConnectionPool(config);
const reportService = require('../services/SendEmailService');
const validateCustomerSchema = require('../services/customerValidation')
module.exports = {
    getAllTheCustomer: async(req, res) => {
        try {
            await pool.connect();
            const result = await pool.request().execute('GetCustomers');
            if (result.rowsAffected.length) res.json({ success: true, message: 'Customer retrieved successfully', data: result })
        } catch (error) {
            res.status(500).json(`Get All Customers Error: ${error}`);
        }
    },
    updateCustomer: async(req, res) => {
        const { fullname, phonenumber, profile, password, email } = req.body;
        const { id } = req.params;
        try {
            await pool.connect();
            let hashed_pwd = await bcrypt.hash(password, 8)
            const result = await pool.request()
                .input("id", id)
                .input('fullname', fullname)
                .input('email', email)
                .input('profile', profile)
                .input('password', hashed_pwd)
                .input('phonenumber', phonenumber)
                .execute('UpdateCustomer');
            console.log(result);
            if (result.rowsAffected.length) res.json({ success: true, message: 'Customer updated successfully', data: result.recordset })
        } catch (error) {
            console.log(error)
        }

    },
    SoftDeleteCustomer: async(req, res) => {
        const { id } = req.params
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id).execute('Remove_Customer');
            if (result.rowsAffected.length) res.json({ success: true, message: 'Customer deleted successfully' })
        } catch (error) {
            res.status(500).json(`Remove Customer Error: ${error}`);
        }
    },
    createCustomer: async(req, res) => {
        const details = req.body;
        const { role } = req.params;
        let customerStatus = 0;
        try {
            // validate the content
            if (role === 'SuperAdmin' || role === 'Admin') {
                customerStatus = 1;
                reportService.sendAccountCreation(details.email, details.passwords, details.fullname)
            }
            let value = await validateCustomerSchema(details)
            try {
                let hashed_pwd = await bcrypt.hash(details.passwords, 8)
                    // determine the Customer status based on the user role
                await pool.connect();
                let results = await pool.request()
                    .input('fullname', value.fullname)
                    .input('email', value.email)
                    .input('profile', value.profile)
                    .input('password', hashed_pwd)
                    .input('gender', value.gender)
                    .input('phonenumber', value.phonenumber)
                    .input('loyalty_points', value.loyalty_points)
                    .input('country', value.country)
                    .input('DOB', value.DOB)
                    .input("status", customerStatus)
                    .execute('add_customer');
                console.log(results.recordset);
                res.json({ success: true, message: 'Customer created successfully', data: results.recordset });
            } catch (error) {
                res.status(500).json({ success: false, message: `Error creating Customer ${error}` })
            }

        } catch (error) {
            res.status(500).json({ success: false, message: `Error creating category ${error}` })
        }
    },
    updateCustomerStatus: async(req, res) => {
        const { status } = req.body;
        const { id } = req.params;
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id)
                .input('status', status)
                .execute('UpdateCustomer_Status');
            console.log(result);
            if (result.rowsAffected.length) res.json({ success: true, message: 'Customer Status updated successfully', data: result.recordset })
        } catch (error) {
            console.log(error)
        }

    },
    updateCustomerPoints: async(req, res) => {
        const { points } = req.body;
        const { id } = req.params;
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id)
                .input('points', points)
                .execute('update_loyalty_points');
            console.log(result);
            if (result.rowsAffected.length) res.json({ success: true, message: 'Customer Points updated successfully', data: result.recordset })
        } catch (error) {
            console.log(error)
        }

    },
}