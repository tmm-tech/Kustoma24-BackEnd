const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const UserRoutes = require('./Routes/UserRoutes')
const app = express();
app.use(bodyParser.json());
app.use(cors())

// CRUD = CREATE(POST), READ(GET), UPDATE(PUT/PATCH), DELETE(DELETE)
//requires two parameters,port and callback function

app.use('/kustoma24', UserRoutes);
// CRUD = CREATE(POST), READ(GET), UPDATE(PUT/PATCH), DELETE(DELETE)
//requires two parameters,port and callback function
const port = process.env.PORT || 4080;
app.listen(port, () => { console.log(`Server Listening on port: ${port}`) })