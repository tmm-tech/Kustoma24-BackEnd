const categoriesRoutes = require('express').Router();
const {} = require('../Controllers/customerControllers');


//update category
categoriesRoutes.put('/category', updateCategory)

// get all category
categoriesRoutes.get('/category', getAllcategory)


//soft delete category of a specific id
categoriesRoutes.delete('/category/:id', SoftDeletecategory)

// create category
categoriesRoutes.post('/category', createcategory)

module.exports = categoriesRoutes;