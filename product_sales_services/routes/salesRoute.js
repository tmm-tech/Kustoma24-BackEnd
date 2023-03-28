const salesRoutes = require('express').Router();
const { getAllSales } = require('../Controllers/salesControllers');

// get all sales
salesRoutes.get('/sales', getAllSales);

// // update sales status
// salesRoutes.put('/sales/:id', createSale)

module.exports = salesRoutes;