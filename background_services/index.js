const express = require('express');
require('dotenv').config();
const activitiesRoute = require('./routes/activitiesRoute');
const notificationRoute = require('./routes/notificationRoute');
const app = express();
app.use(express.json());

//Routes

app.use('/activities', activitiesRoute);
app.use('/notification', notificationRoute);
app.get('/', async(req, res) => {
    res.send("Confirmed Connection is Successful");
})


//connection to the server
const port = process.env.PORT || 4080;
app.listen(port, () => { console.log(`Server Listening on port: ${port}`) })