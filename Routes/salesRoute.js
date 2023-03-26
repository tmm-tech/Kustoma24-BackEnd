const salesRoutes = require('express').Router();
const {

} = require('../Controllers/salesControllers');

// get all sales
salesRoutes.get('/sales', getAllSales)

// update sales status
salesRoutes.put('/sales/:id', updatesales)

module.exports = salesRoutes;