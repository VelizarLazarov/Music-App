const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    artist:{
        type:String,
        required:true
    },
    length:{
        type:String,
    },
    songUrl:{
        type:String
    }
})

module.exports = mongoose.model('Song', songSchema);