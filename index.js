const express = require('express');
const connDB = require('./config/db');
const cors = require('cors');
//Create server
const app = express();

//Acces domain list for CORS
var whitelist = ['https://www.gabrieldelosrios.dev', 'https://www.gabreact-project-resumeapp.netlify.app/', 'https://ucarecdn.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
//Connect to database
connDB();
app.use(cors(corsOptions));
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
app.use('/api/v1/personal', require('./routes/personal'));
app.use('/api/v1/pictures', require('./routes/pictures'));
app.use('/api/v1/contact', require('./routes/contact'));
app.use(express.static('public'));

//Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log('Server is running on port ' + PORT);
});