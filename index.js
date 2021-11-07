const express = require('express');
const connDB = require('./config/db');

//Create server
const app = express();

//Connect to database
connDB();

//Enable express.json
//Allows us to read json with header tag application/json without the body parse function
app.use(express.json({ extended: true }));

//Port
const PORT = process.env.PORT || 4000;

//Routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/auth', require('./routes/auth'));
//Start server
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});