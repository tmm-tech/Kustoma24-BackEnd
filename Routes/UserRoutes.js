const UserRoutes = require('express').Router();
const {
    createUser,
    getAUser,
    updateUser,
    getAllThecustomers,
    SoftDeleteUser,
    loginUser,
} = require('../Controllers/UserControllers');

//read data
UserRoutes.get('/customers', getAllThecustomers)
    // create and insert data into the table
UserRoutes.post('/register', createUser)
    //read for a specific id
UserRoutes.get('/User/:id', getAUser)
    //soft delete item of a specific id
UserRoutes.delete('/User/:id', SoftDeleteUser)
    //update items
UserRoutes.put('/Users', updateUser)
    // login a user
UserRoutes.post('/login/User', loginUser)
    // update product
UserRoutes.get('/product/:id', updateproduct)
    //soft delete product of a specific id
UserRoutes.delete('/product/:id', SoftDeleteproduct)
    //update category
UserRoutes.put('/category', updateCategory)
    // create product
UserRoutes.post('/product', createProduct)
    //read for a specific id
UserRoutes.get('/product/:id', getAproduct)
    // get all products
UserRoutes.get('/products', getAllproduct)
    // get all category
UserRoutes.get('/category', getAllcategory)
    // get all notification
UserRoutes.get('/notifications', getAllnotifications)
    // get all sales
UserRoutes.get('/sales', getAllSales)
    // get all activities
UserRoutes.get('/activities', getAllActivities)
    // update sales status
UserRoutes.put('/sales/:id', updatesales)
    //soft delete category of a specific id
UserRoutes.delete('/category/:id', SoftDeletecategory)
    //update customer
UserRoutes.put('/customer', updatecustomer)
    // create category
UserRoutes.post('/category', createcategory)
    // create notification
UserRoutes.post('/notification', createnotification)
    // create activity
UserRoutes.post('/activity', createactivity)
module.exports = UserRoutes