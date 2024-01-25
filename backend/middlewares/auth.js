const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.isAuth = async (req, res, next) => {
    const token = req.body.token;

    if(!token){
        console.log('in Auth: can not find token in request body.');
        return res.status(401).json({error: 'Unauthorize'});
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const user =  await User.findById(decodedData.id);
    if(!user){
        console.log('in Auth: someone access with unathorized token.');
        return res.status(401).json({error: 'token unauthorized'});
    }

    req.user = user;
    next();
};