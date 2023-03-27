const categoriesRoutes = require('express').Router();
const { getAllcategory, updateCategory, SoftDeletecategory, createcategory, updateCategoryStatus } = require('../Controllers/categoriesControllers');


// get all category
categoriesRoutes.get('/category', getAllcategory)

//update category
categoriesRoutes.put('/category/:id', updateCategory)

//soft delete category of a specific id
categoriesRoutes.delete('/category/:id', SoftDeletecategory)

// create category
categoriesRoutes.post('/category/:role', createcategory)

// update status category
categoriesRoutes.put('/category/:id', updateCategoryStatus)

module.exports = categoriesRoutes;