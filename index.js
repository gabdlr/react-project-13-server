const express = require('express');

//Server
const app = express();
//Port
const PORT = process.env.PORT || 4000;

//Start server
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});