const cron = require('node-cron');
const reportService = require('../Services/SendReportEmailService');

// Run every week on Monday at 9:00 AM
cron.schedule('0 9 * * 1', () => {
    reportService.sendWeeklyReport();
});

// Run every month on the first day at 10:00 AM
cron.schedule('0 10 1 * *', () => {
    reportService.sendMonthlyReport();
});

// Run every quarter on the first day of January, April, July, and October at 11:00 AM
cron.schedule('0 11 1 */3 *', () => {
    reportService.sendQuarterlyReport();
});

// Run every year on January 1st at 12:00 PM
cron.schedule('0 12 1 1 *', () => {
    reportService.sendYearlyReport();
});