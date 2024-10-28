const jwt = require('jsonwebtoken');
require('dotenv').config();
// const User = require('../models/User');
exports.auth = async(req,res,next) => {
    try {
        console.log(req.cookies);
        const {token} = req.cookies;
        if(!token) return res.status(401).json({success : false, message : 'No token is provided'});
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (!payload) return res.status(403).json(({success : false, message : 'Token is not valid'}))
        req.user = payload;
        next();
    } catch (error) {
        console.log(error)
         // Check if the error is due to token expiration
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token has expired. Please log in again.' });
        }
        res.status(500).json({success : false, message : 'Internal server error\nCouldn\'t authenticate'})
    }
}