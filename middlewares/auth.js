const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    //Read token in header
    const token = req.header('x-auth-token');
    //Check if there is token
    if(!token){
        res.status('401').json({msg: "No token is present. Authentication failed."})
    }

    //Validate token
    try {
        const ciphered = jwt.verify(token, process.env.SECRET_WORD);
        req.user = ciphered.user;
        next();
    } catch (error) {
        res.status('401').json({msg: "Token authentication failed."});
    }
}