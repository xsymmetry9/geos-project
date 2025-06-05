// src/middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({path: `.env${process.env.NODE_ENV || development}`})


//Format Token
//Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== "undefined") {
        //Split at the space

        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        //Set the token 
        req.token = bearerToken;
            console.log(bearerToken);

        try{
            const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET || 'secretkey');
            req.user = decoded.user;
            next();
        } catch(err) {
            res.status(403).json({message: "Invalid or expired token"})
        } 
    } else {
        //Forbidden
        res.status(403).json({message: "No token provided"});
    }
}

module.exports = {verifyToken};