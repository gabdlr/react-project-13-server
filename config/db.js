const mongoose = require('mongoose');
require('dotenv').config({ path: 'vars.env'});

//Connect to db
const connDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, 
        {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
        console.log('Connection to database successful');
    } catch (error) {
        console.log(error);
        //Stop app execution
        process.exit(1);        
    }
}

module.exports = connDB;