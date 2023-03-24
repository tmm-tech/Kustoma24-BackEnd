const express = require('express');
require('dotenv').config()
const UserRoutes = require('./Routes/UserRoutes')
const app = express();
app.use(express.json());

// CRUD = CREATE(POST), READ(GET), UPDATE(PUT/PATCH), DELETE(DELETE)
//requires two parameters,port and callback function

app.use('/kustoma24', UserRoutes);
// CRUD = CREATE(POST), READ(GET), UPDATE(PUT/PATCH), DELETE(DELETE)
//requires two parameters,port and callback function
const port = process.env.PORT || 4080;
app.listen(port, () => { console.log(`Server Listening on port: ${port}`) })