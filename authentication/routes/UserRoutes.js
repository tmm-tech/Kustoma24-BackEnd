const UserRoutes = require('express').Router();
const {
    createUser,
    getAUser,
    updateUser,
    SoftDeleteUser,
    loginUser,
    Logout,
} = require('../controllers/UserControllers');

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
    // logout user
UserRoutes.post('/logout/:id', Logout)
    //authenticate
    // UserRoutes.get('/user/authenticate', userAuthenticate)

module.exports = UserRoutes
module.exports = UserRoutes