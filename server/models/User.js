const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS,SECRET } = require('../config/config');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    playlists:[{
        type:mongoose.Types.ObjectId,
        ref:'Playlist'
    }],
    likedPlaylists:[{
        type:mongoose.Types.ObjectId,
        ref:'Playlist'
    }]
})

userSchema.pre('save', function(next){
    bcrypt.genSalt(SALT_ROUNDS)
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
        this.password = hash;
        next()
    })
})

module.exports = mongoose.model('User', userSchema);