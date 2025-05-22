// src/middlewares/authMiddleware.js

const ensureAuthenticated = (req, res, next) =>{
    if(req.isAuthenticated()) {
        return next(); // user logged in, proceed
    }
}

const ensureNotAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next(); // user is not logged in, proceed
    }

    res.status(403).json({message: "You are already logged in."});
}

module.exports = {ensureAuthenticated, ensureNotAuthenticated};