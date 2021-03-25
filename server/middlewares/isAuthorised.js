const jwt = require('jsonwebtoken');
const { SECRET, COOKIE_NAME } = require('../config/config');

function authorise(req,res,next){
    let token = req.cookies[COOKIE_NAME];

    if(!token) return res.status(401).redirect('/auth/login');

    jwt.verify(token,SECRET, function(err,decoded){
        if(err) return res.status(401).redirect('/auth/login');
        next()
    })
}

module.exports = authorise