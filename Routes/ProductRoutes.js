const productRoutes = require('express').Router();
const {} = require('../Controllers/productControllers');
// update product
productRoutes.get('/product/:id', updateproduct)
    //soft delete product of a specific id
productRoutes.delete('/product/:id', SoftDeleteproduct)
    // create product
productRoutes.post('/product', createProduct)
    //read for a specific id
productRoutes.get('/product/:id', getAproduct)
    // get all products
productRoutes.get('/products', getAllproduct)

module.exports = productRoutes;