const express = require('express');
const connDB = require('./config/db');
const cors = require('cors');
//Create server
const app = express();

//Connect to database
connDB();
app.use(cors())
//Enable express.json
//Allows us to read json with header tag application/json without the body parse function
app.use(express.json({ extended: true }));

//Port
const PORT = process.env.PORT || 4000;

//Routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/user', require('./routes/user'));
app.use('/api/v1/profile', require('./routes/profile'));
app.use('/api/v1/education', require('./routes/education'));
app.use('/api/v1/jobs', require('./routes/jobs'));
app.use('/api/v1/courses', require('./routes/courses'));
app.use('/api/v1/stack', require('./routes/stack'));
//Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log('Server is running on port ' + PORT);
});