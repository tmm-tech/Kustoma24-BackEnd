const activitiesRoute = require('express').Router();
const {
    getAllActivities,
    createactivity,
} = require('../Controllers/activitiesControllers');

// get all activities
UserRoutes.get('/activity/:id', getAllActivities);
// create activity
UserRoutes.post('/activity', createactivity);