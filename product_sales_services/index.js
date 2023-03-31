const express = require('express');
require('dotenv').config();
const cors = require('cors');
const categoriesRoute = require('./routes/categoriesRoute');
const ProductRoutes = require('./routes/ProductRoutes');
const salesRoute = require('./routes/salesRoute');
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
//Routes
app.use('/categories', categoriesRoute);
app.use('/product', ProductRoutes);
app.use('/sales', salesRoute);
app.get('/', async(req, res) => {
    res.json({ message: " Product Sals and Category Route Directory" });
})


//connection to the server
const port = process.env.PORT || 4080;
app.listen(port, () => { console.log(`Product Server Listening on port: ${port}`) })