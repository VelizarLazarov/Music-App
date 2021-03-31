const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

const register = (username,password) => {
    let user = new User({username,password});
    return user.save();
}

const addLikedList = (userId, listId) => User.findByIdAndUpdate(userId, {$push: {likedPlaylists: listId}})

const getUser = (param) => User.findOne({username:param}).lean();

const login = async (name,password) => {
    let user = await User.findOne({username: name});

    if(user){
        let areEqual = await bcrypt.compare(password,user.password);
        if(areEqual){
            let token = jwt.sign({_id:user._id, username:user.username}, SECRET);
            return token;
        }

    }
}

module.exports = {register, login, getUser, addLikedList}