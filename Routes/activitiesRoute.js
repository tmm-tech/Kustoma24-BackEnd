const activitiesRoute = require('express').Router();
const {
    getAllActivities,
    createactivity,
} = require('../Controllers/activitiesControllers');

// get all activities
activitiesRoute.get('/activity/:id', getAllActivities);
// create activity
activitiesRoute.post('/activity', createactivity);


module.exports = activitiesRoute