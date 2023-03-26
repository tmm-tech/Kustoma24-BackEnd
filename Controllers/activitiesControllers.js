const sql = require('mssql');
const { config } = require('../config/sqlConfig');
const pool = new sql.ConnectionPool(config);
module.exports = {
    getAllActivities: async(req, res) => {
        const { id } = req.params
        try {
            await pool.connect();
            const result = await pool.request()
                .input("id", id).execute('Getactivity');
            const activities = result.recordset;
            res.json(activities);
            if (result.rowsAffected.length) res.json({ success: true, message: 'activity retrieved successfully' })
        } catch (error) {
            res.status(500).json(`Get All Activitie Error: ${error}`);
        }
    },
    createactivity: async(req, res) => {
        const { user_id, title, description } = req.body;
        console.log(user_id)
        try {
            await pool.connect();
            const result = await pool.request()
                .input("user_id", user_id)
                .input("title", title)
                .input("description", description)
                .execute('add_activity');
            if (result.rowsAffected.length) res.json({ success: true, message: 'activity created successfully' })
        } catch (error) {
            res.status(500).json(`Create Activity Error: ${error}`)
        }
    }
}