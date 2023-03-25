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
        } catch (error) {
            res.status(500).json(`Get All Activitie Error: ${error}`);
        }
    },
    createactivity: async(req, res) => {
        const { title, description } = req.body;
        try {
            await pool.connect();
            const result = await pool.request()
                .input("title", title)
                .input("description", description)
                .execute('add_activity');
            const activity = result.recordset;
            res.json(activity);
        } catch (error) {
            res.status(500).json(`Create ActivityError: ${error}`)
        }
    }
}