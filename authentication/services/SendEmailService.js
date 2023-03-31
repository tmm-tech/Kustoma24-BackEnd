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
    // Html account template

// HTML SALES MADE TEMPLATE
const salesTemplate = `<html>

    <head>
        <title>Sales Report</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: white;
                margin: 0;
                padding: 0;
                width: 100%;
                max-width: 600px;
            }
            
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #f2f2f2;
                padding: 20px;
            }
            
            h1,
            h2 {
                color: #444444;
                text-align: center;
            }
            
            table {
                border-collapse: collapse;
                margin: 0 auto;
                background-color: white;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            }
            
            th,
            td {
                padding: 12px;
                text-align: center;
                border: 1px solid #dddddd;
            }
            
            th {
                background-color: #f2f2f2;
                font-weight: bold;
                color: #444444;
            }
            
            td {
                font-weight: bold;
                color: #666666;
            }
            
            tbody tr:nth-child(even) {
                background-color: #f9f9f9;
            }
            
            img {
                display: block;
                margin: auto;
                max-height: 100px;
                max-width: 100%;
            }
            
            .summary {
                margin-top: 20px;
                padding: 20px;
                border: 1px solid #dddddd;
                background-color: white;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            }
            
            .summary p {
                margin: 10px 0;
                font-size: 16px;
                color: #444444;
            }
            
            .summary p strong {
                margin-right: 10px;
            }
        </style>
    </head>
    
    <body>
        <div>
            <img class="logo" src="" alt="Kustoma24">
        </div>
        <h1>Sales Report</h1>
        <p>Dear [Customer Name],</p>
        <p>Thank you for your recent purchase on our website. We are excited to share with you the details of your order.</p>
        <h2>Customer Information</h2>
        <p>Name: <strong>[Customer Name]</strong></p>
        <p>Email: <strong>[Customer Email]</strong></p>
        <h2>Purchased Items</h2>
        <table>
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Image</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>[Product ID]</td>
                    <td>[Product Name]</td>
                    <td><img src="[Product Image]" alt="[Product Name]"></td>
                    <td>$[Price]</td>
                    <td>$[Discount]</td>
                    <td>[Quantity]</td>
                    <td>$[Total Price]</td>
                </tr>
                <!-- Repeat this row for each purchased item -->
            </tbody>
        </table>
        <div class="summary">
            <h2>Sales Summary</h2>
            <p><strong>Total Items Purchased:</strong> [Total Items]</p>
            <p><strong>Total Cost:</strong> $[Total Cost]</p>
            <p><strong>Total Revenue:</strong> $[Total Revenue]</p>
            <p><strong>Profit/Loss:</strong> $[Profit/Loss]</p>
            <p>We value your patronage and hope to serve you again soon.</p>
            <p>Best regards,</p>
            <p>The Sales Team</p>
        </div>
        <div class="logo-container">
            <img class="logo" src="[Company Logo]" alt="[Company Name]">
        </div>
    </body>
    
    </html>`;

// Function to send weekly report
exports.sendWeeklyReport = (recipient) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: 'Weekly Report',
        html: `
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
                <img src="https://firebasestorage.googleapis.com/v0/b/kustoma24-8959e.appspot.com/o/navy.png?alt=media&token=6d6fdde1-3f5e-4045-ba54-5f0e0011f1f3" alt="Your Company Logo">
            </div>
            <br><br>
            <p>We are pleased to share with you our weekly report.Please find below a summary of our key metrics and perfomance indicators: </p>
            <p>As of [March 20 - March 26, 2023], our sales has achieved the following.</p>
            <div class="chart-container">
            <canvas id="myBarChart" class='chart'></canvas>
            <canvas id="myPieChart" class='chart'></canvas>
            </div>
            <div class="summary-container">
                <div class="table-container">
                <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Count</th>
                        <th>Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Complete</td>
                        <td>20</td>
                        <td>$4,178.00</td>
                    </tr>
                    <tr>
                        <td>Pending</td>
                        <td>5</td>
                        <td>$1,048.95</td>
                    </tr>
                    <tr>
                        <td>Refunded</td>
                        <td>1</td>
                        <td>$219.95</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td>26</td>
                        <td>$5,446.90</td>
                    </tr>
                </tfoot>
                </table>
                </div>
            </div>
            <p>Thank you for your continued support.</p>
            <p>Best Regards,</p>
            <p>[Mark.]</p>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js"></script>
        <script>
    // Define data for the bar chart
    const barChartData = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [{
        label: "Sales",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: [10, 20, 30, 40, 50, 60],
      }]
    };

    // Define options for the bar chart
    const barChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Bar Chart Example'
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    // Define data for the pie chart
    const pieChartData = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [{
        label: "Sales by Color",
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        borderColor: "rgba(255, 255, 255, 1)",
        borderWidth: 2,
        data: [10, 20, 30],
      }]
    };

    // Define options for the pie chart
    const pieChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Pie Chart Example'
        }
      },
    };

    // Create the bar chart and pie chart
    const barChart = new Chart(document.getElementById('myBarChart'), {
      type: 'bar',
      data: barChartData,
      options: barChartOptions
    });
    const pieChart = new Chart(document.getElementById('myPieChart'), {
      type: 'pie',
      data: pieChartData,
      options: pieChartOptions
    });
  </script>
    </body>
    
    </html>
        `
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Weekly report sent: ' + info.response);
        }
    });
};

exports.sendCustomerPurchase = (recipient, title) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: title,
        html: salesTemplate
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Items Purchased Mail sent: ' + info.response);
        }
    });
};

exports.sendAccountCreation = (recipient, password, fullname) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: 'Account Confirmation',
        html: `<html>

        <head>
            <title>Account Created Confirmation</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    margin: 0;
                    padding: 0;
                }
                
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f5f5f5;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                
                h1 {
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 20px;
                }
                
                p {
                    margin-bottom: 10px;
                }
                
                ul {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }
                
                li {
                    margin-bottom: 10px;
                }
                
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #2A3F54;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: background-color 0.3s ease;
                }
                
                .btn:hover {
                    background-color: #0069d9;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <h1>Account Confirmation</h1>
                <p>Dear ${fullname},</p>
                <p>We are pleased to inform you that your account has been successfully created. Please find below your login credentials:</p>
                <ul>
                    <li><strong>Username: </strong> ${recipient}</li>
                    <li><strong>Password: </strong>${password}</li>
                </ul>
                <p>You can now use your login credentials to access your account and start shopping on our website.</p>
                <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
                <a href="http:/localhost:3000/" class="btn">Go to Website</a>
            </div>
        </body>
        
        </html>`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Account Creation sent: ' + info.response);
        }
    });
};