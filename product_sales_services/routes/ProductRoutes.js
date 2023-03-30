const productRoutes = require('express').Router();
const { updateproduct, SoftDeleteproduct, createproduct, getAllproduct, updateproductStatus } = require('../controllers/productControllers');
// update product
productRoutes.put('/product/:id', updateproduct)
    //soft delete product of a specific id
productRoutes.delete('/product/:id', SoftDeleteproduct)
    // create product
productRoutes.post('/product', createproduct)
    //update product status
productRoutes.put('/productstatus/:id', updateproductStatus)
    // get all products
productRoutes.get('/products', getAllproduct)

module.exports = productRoutes;