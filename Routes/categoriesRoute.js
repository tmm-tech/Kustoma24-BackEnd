const categoriesRoutes = require('express').Router();
const { getAllcategory, updateCategory, SoftDeletecategory, createcategory } = require('../Controllers/categoriesControllers');


// get all category
categoriesRoutes.get('/category', getAllcategory)

//update category
categoriesRoutes.put('/category', updateCategory)

//soft delete category of a specific id
categoriesRoutes.delete('/category/:id', SoftDeletecategory)

// create category
categoriesRoutes.post('/category', createcategory)

module.exports = categoriesRoutes;