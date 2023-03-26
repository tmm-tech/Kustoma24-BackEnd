const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateCreateUserSchema = require('../Services/RegistrationValidation')
const validateCreateloginUserSchema = require('../Services/LoginValidation')
const { config } = require('../config/sqlConfig');
const pool = new sql.ConnectionPool(config);
module.exports = {
    // getAllThecustomers: async(req, res) => {
    //     try {
    //         await pool.connect();
    //         const result = await pool.request().execute('GetCustomers');

    //     } catch (error) {
    //         console.log(error)
    //     }
    // },
    createUser: async(req, res) => {
        const details = req.body;

        try {
            // validate the content 
            let value = await validateCreateUserSchema(details)
            console.log('Registration')
                // bcrypt asynchronous
            let hashed_pwd = await bcrypt.hash(value.password, 8)

            await pool.connect();
            let results = await pool.request()
                .input("fullname", value.fullname)
                .input("email", value.email)
                .input("profile", value.profile)
                .input("password", hashed_pwd)
                .input("gender", value.gender)
                .input("department", value.department)
                .input("roles", value.roles)
                .input("status", "inactive")
                .execute('add_User')
            console.log(results.recordset);
            res.json({ success: true, message: 'Registration successful' })

        } catch (error) {
            res.status(500).json({ success: false, message: `Error registering user ${error}` })
        }
    },
    loginUser: async(req, res) => {
        const { email, password } = req.body;

        try {
            const pool = await sql.connect(config);
            const result = await pool.request()
                .input('email', sql.VARCHAR, email)
                .execute('UserLogin');

            if (result.recordset.length > 0) {
                const user = result.recordset[0];
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET);
                    await pool.request()
                        .input('user_id', sql.Int, user.user_id)
                        .input('status', "active")
                        .execute('UpdateUserStatus');
                    res.json({ success: true, token });
                } else {
                    res.status(401).json({ success: false, message: 'Invalid email or password' });
                }
            } else {
                res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error logging in' });
        }
    },
    getAUser: async(req, res) => {
        const { id } = req.params
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id).execute('GetUser');
            const users = result.recordset;
            res.json(users);
            console.log(users)
        } catch (error) {
            res.status(500).json(`Get User Details Error: ${error}`);
        }
    },
    updateUser: async(req, res) => {
        const { fullname, department, profile, password, email, roles } = req.body;
        const { id } = req.params;
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id)
                .input('fullname', fullname)
                .input('email', email)
                .input('profile', profile)
                .input('password', password)
                .input('department', department)
                .input('roles', roles)
                .execute('updateUser');
            console.log(result);
            if (result.rowsAffected.length) res.json({ success: true, message: 'user updated successfully' })
        } catch (error) {
            console.log(error)
        }

    },
    SoftDeleteUser: async(req, res) => {
        const { id } = req.params
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id).execute('RemoveUser');
            const users = result.recordset;
            res.json(users);
            console.log(users)
        } catch (error) {
            res.status(500).json(`Get User Details Error: ${error}`);
        }

    },
    Logout: async(req, res) => {
        const { id } = req.params
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id).execute('Logout');
            const users = result.recordset;
            res.json(users);
            console.log(users)
        } catch (error) {
            res.status(500).json(`Get User Details Error: ${error}`);
        }
    },


}