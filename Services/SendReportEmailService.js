const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },

    })
    // Function to send weekly report
exports.sendWeeklyReport = () => {
    const mailOptions = {
        from: 'youremail@gmail.com',
        to: 'recipient1@example.com, recipient2@example.com',
        subject: 'Weekly Report',
        text: 'This is the weekly report.'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Weekly report sent: ' + info.response);
        }
    });
};

// Function to send monthly report
exports.sendMonthlyReport = () => {
    const mailOptions = {
        from: 'youremail@gmail.com',
        to: 'recipient1@example.com, recipient2@example.com',
        subject: 'Monthly Report',
        text: 'This is the monthly report.'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Monthly report sent: ' + info.response);
        }
    });
};

// Function to send quarterly report
exports.sendQuarterlyReport = () => {
    const mailOptions = {
        from: 'youremail@gmail.com',
        to: 'recipient1@example.com, recipient2@example.com',
        subject: 'Quarterly Report',
        text: 'This is the quarterly report.'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Quarterly report sent: ' + info.response);
        }
    });
};

// Function to send yearly report
exports.sendYearlyReport = () => {
    const mailOptions = {
        from: 'youremail@gmail.com',
        to: 'recipient1@example.com, recipient2@example.com',
        subject: 'Yearly Report',
        text: 'This is the yearly report.'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Yearly report sent: ' + info.response);
        }
    });
};