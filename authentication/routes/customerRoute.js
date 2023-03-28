const customerRoutes = require('express').Router();
const { getAllTheCustomer, updateCustomer, SoftDeleteCustomer, createCustomer, updateCustomerStatus, updateCustomerPoints } = require('../Controllers/customerControllers');

//read data
customerRoutes.get('/customers', getAllTheCustomer);
//update customer
customerRoutes.put('/customer/:id', updateCustomer);

//soft delete customer of a specific id
customerRoutes.delete('/customer/:id', SoftDeleteCustomer)
    // create customer
customerRoutes.post('/customer/:role', createCustomer)
    //update status
customerRoutes.put('/customerstatus/:id', updateCustomerStatus)
    //update loyalty points
customerRoutes.put('/customerpoints/:id', updateCustomerPoints)

module.exports = customerRoutes;