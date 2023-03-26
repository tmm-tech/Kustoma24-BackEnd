const UserRoutes = require('express').Router();
const {
    createUser,
    getAUser,
    updateUser,
    SoftDeleteUser,
    loginUser,
} = require('../Controllers/UserControllers');


// create and insert data into the table
UserRoutes.post('/register', createUser)
    //read for a specific id
UserRoutes.get('/user/:id', getAUser)
    //soft delete item of a specific id
UserRoutes.delete('/user/:id', SoftDeleteUser)
    //update items
UserRoutes.put('/update/:id', updateUser)
    // login a user
UserRoutes.post('/login', loginUser)
    //     // update product
    // UserRoutes.get('/product/:id', updateproduct)
    //     //soft delete product of a specific id
    // UserRoutes.delete('/product/:id', SoftDeleteproduct)
    //     //update category
    // UserRoutes.put('/category', updateCategory)
    //     // create product
    // UserRoutes.post('/product', createProduct)
    //     //read for a specific id
    // UserRoutes.get('/product/:id', getAproduct)
    //     // get all products
    // UserRoutes.get('/products', getAllproduct)
    //     // get all category
    // UserRoutes.get('/category', getAllcategory)
    //     // get all notification
    // UserRoutes.get('/notifications', getAllnotifications)
    //     // get all sales
    // UserRoutes.get('/sales', getAllSales)

// // update sales status
// UserRoutes.put('/sales/:id', updatesales)
//     //soft delete category of a specific id
// UserRoutes.delete('/category/:id', SoftDeletecategory)
//     //update customer
// UserRoutes.put('/customer', updatecustomer)
//     // create category
// UserRoutes.post('/category', createcategory)
//     // create notification
// UserRoutes.post('/notification', createnotification)

module.exports = UserRoutes