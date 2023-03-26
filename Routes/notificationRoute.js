const notificationRoutes = require('express').Router();
const {} = require('../Controllers/customerControllers');

// get all notification
notificationRoutes.get('/notifications', getAllnotifications);
// create notification
UserRoutes.post('/notification', createnotification);

module.exports = notificationRoutes;