const cookieParser = require('cookie-parser');
const express = require('express');
const auth = require('../middlewares/auth');

module.exports = function(app){
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    app.use(cookieParser());
    app.use(auth)
}