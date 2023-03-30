const salesRoutes = require('express').Router();
const { getAllSales, createSale, Salestatus } = require('../Controllers/salesControllers');

// get all sales
salesRoutes.get('/sales', getAllSales);

// add sales status
salesRoutes.post('/sales', createSale)

// add sales status
salesRoutes.put('/sales/:id', Salestatus)
module.exports = salesRoutes;