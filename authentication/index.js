const express = require('express');
require('dotenv').config();
const UserRoutes = require('./routes/UserRoutes');
const customerRoute = require('./routes/customerRoute');
const app = express();
app.use(express.json());

//Routes

app.use('/users', UserRoutes);
app.use('/customer', customerRoute);

app.get('/', async(req, res) => {
    res.send("Confirmed Connection  to Authentication is Successful");
})


//connection to the server
const port = process.env.PORT || 4080;
app.listen(port, () => { console.log(`Server Listening on port: ${port}`) })