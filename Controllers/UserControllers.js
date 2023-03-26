const sql = require('mssql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateCreateUserSchema = require('../Services/RegistrationValidation')
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
        const details = req.body;
        console.log(details)
        try {
            await pool.connect();
            const result = await pool.request()
                .input('email', details.email)
                .execute('UserLogin');

            if (result.recordset.length > 0) {
                const user = result.recordset[0];
                const match = await bcrypt.compare(details.password, user.password);
                console.log(match)

                if (match) {
                    console.log(user.id)
                    const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET);
                    await pool.request()
                        .input('id', user.id)
                        .input('status', "active")
                        .execute('UpdateUserStatus');
                    res.json({ success: true, token });
                } else {
                    res.status(401).json({ success: false, message: 'Password no match' });
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
            if (result.rowsAffected.length) res.json({ success: true, message: 'user retrieved successfully' })
        } catch (error) {
            res.status(500).json(`Get User Details Error: ${error}`);
        }
    },
    updateUser: async(req, res) => {
        const { fullname, department, profile, password, email, roles } = req.body;
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
            if (result.rowsAffected.length) res.json({ success: true, message: 'user deleted successfully' })
        } catch (error) {
            res.status(500).json(`Remove User Error: ${error}`);
        }

    },
    Logout: async(req, res) => {
        const { id } = req.params
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id)
                .input("status", "inactive")
                .execute('UpdateUserStatus');
            if (result.rowsAffected.length) res.json({ success: true, message: 'user Log Out successful' })
        } catch (error) {
            res.status(500).json(`Get Log Out Error: ${error}`);
        }
    },


}