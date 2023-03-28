const express = require('express');
require('dotenv').config();
const categoriesRoute = require('./routes/categoriesRoute');
const ProductRoutes = require('./routes/ProductRoutes');
const salesRoute = require('./routes/salesRoute');
const app = express();
app.use(express.json());

//Routes
app.use('/categories', categoriesRoute);
app.use('/product', ProductRoutes);
app.use('/sales', salesRoute);
app.get('/', async(req, res) => {
    res.send("Confirmed Connection is Successful");
})


//connection to the server
const port = process.env.PORT || 4080;
app.listen(port, () => { console.log(`Server Listening on port: ${port}`) })