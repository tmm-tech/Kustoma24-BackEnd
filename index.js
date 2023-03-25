const express = require('express');
require('dotenv').config()
const UserRoutes = require('./Routes/UserRoutes')
const app = express();
app.use(express.json());

//user Routes
app.use('/kustoma24', UserRoutes);

//connection to the server
const port = process.env.PORT || 4080;
app.listen(port, () => { console.log(`Server Listening on port: ${port}`) })