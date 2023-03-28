const sql = require('mssql');
const { config } = require('../config/sqlConfig');
const pool = new sql.ConnectionPool(config);
module.exports = {
    getAllNotification: async(req, res) => {
        const { id } = req.params
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id).execute('Getnotifications');
            if (result.rowsAffected.length) res.json({ success: true, message: 'Notification retrieved successfully', data: result.recordset })
        } catch (error) {
            res.status(500).json(`Get All Notifications Error: ${error}`);
        }
    },
    createnotification: async(req, res) => {
        const { user_id, title, description, receiver } = req.body;
        console.log(user_id)
        try {
            await pool.connect();
            const result = await pool.request()
                .input("user_id", user_id)
                .input("title", title)
                .input("description", description)
                .input("receiver", receiver)
                .execute('add_notifications');
            if (result.rowsAffected.length) res.json({ success: true, message: 'Notification created successfully' })
        } catch (error) {
            res.status(500).json(`Create Notifications Error: ${error}`)
        }
    }
}