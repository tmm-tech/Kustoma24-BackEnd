const cron = require('node-cron');
const reportService = require('../Services/SendReportEmailService');

// Run every week on Monday at 9:00 AM
cron.schedule('0 9 * * 1', () => {
    reportService.sendWeeklyReport();
});