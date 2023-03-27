const express = require('express');
require('dotenv').config();
const UserRoutes = require('./Routes/UserRoutes');
const activitiesRoute = require('./Routes/activitiesRoute');
const categoriesRoute = require('./Routes/categoriesRoute');
const customerRoute = require('./Routes/customerRoute');
const notificationRoute = require('./Routes/notificationRoute');
const ProductRoutes = require('./Routes/ProductRoutes');
// const salesRoute = require('./Routes/salesRoute');
const app = express();
app.use(express.json());

//Routes

app.use('/activities', activitiesRoute);
app.use('/categories', categoriesRoute);
app.use('/users', UserRoutes);
app.use('/customer', customerRoute);
app.use('/notification', notificationRoute);
app.use('/product', ProductRoutes);
// app.use('/sales', salesRoute);
app.get('/', async(req, res) => {
    res.send("Confirmed Connection is Successful");
})


//connection to the server
const port = process.env.PORT || 4080;
app.listen(port, () => { console.log(`Server Listening on port: ${port}`) })