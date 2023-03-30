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
    // Html Email  Template
const htmlTemplate = `
    <html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weekly Report</title>
    <style>
        /* Define styles for the email */
        
        body {
            font-family: Arial sans-serif;
            background-color: #f6f6f6;
        }
        
        p {
            color: #666;
            line-height: 1.5px;
            margin-bottom: 20px;
        }
        
        .container {
            max-width: 70vw;
            height: 100vh;
            margin: 0 auto;
            font-family: Arial, sans-serif;
            font-size: 16px;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-items: left;
            justify-content: center;
            line-height: 1.5;
            color: #333;
        }
        
        .logo {
            margin-bottom: 20px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .chart-container {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
        
        .chart {
            margin-bottom: 30px;
            width: 50%;
        }
        
        .summary-container {
            display: flex;
            width: 70vw;
            flex-wrap: wrap;
            align-items: center;
            flex-direction: row;
            justify-content: space-between;
        }
        
        .table-container {
            width: 50%;
            margin-bottom: 20px;
        }
        
        table {
            border-collapse: collapse;
            width: 100%;
        }
        
        th,
        td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        
        th {
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Weekly Report</h1>
        <p>Dear [SuperAdmin], </p>
        <div class="logo">
            <img src="https://yourcompany.com/logo.png" alt="Your Company Logo">
        </div>
        <br><br>
        <p>We are pleased to share with you our weekly report.Please find below a summary of our key metrics and perfomance indicators: </p>
        <p>As of [March 20 - March 26, 2023], our sales has achieved the following.</p>
        <div class="chart-container">
            <div class="chart">
                <img src="https://yourcompany.com/chart1.png" alt="Chart 1">
            </div>
            <div class="chart">
                <img src="https://yourcompany.com/chart2.png" alt="Chart 2">
            </div>
        </div>
        <div class="summary-container">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Item 1</td>
                            <td>10</td>
                            <td>$100.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Item 1</td>
                            <td>10</td>
                            <td>$100.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <p>Thank you for your continued support.</p>
        <p>Best Regards,</p>
        <p>[Mark.]</p>
    </div>

</body>

</html>
    `;
// Function to send weekly report
exports.sendWeeklyReport = (recipient) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: 'Weekly Report',
        html: htmlTemplate
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Weekly report sent: ' + info.response);
        }
    });
};