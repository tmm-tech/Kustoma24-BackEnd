const notificationRoutes = require('express').Router();
const { getAllNotification, createnotification } = require('../controllers/notificationControllers');

// get all notification
notificationRoutes.get('/notifications/:id', getAllNotification);
// create notification
notificationRoutes.post('/', createnotification);

module.exports = notificationRoutes;