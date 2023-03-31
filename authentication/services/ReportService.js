const cron = require('node-cron');
const reportService = require('../services/SendEmailService');

function scheduleReport() {
    // Run every week on Monday at 9:00 AM
    cron.schedule('50 07 * * *', () => {
        reportService.sendWeeklyReport('tonymugi4@gmail.com');
    });
}
module.exports = scheduleReport