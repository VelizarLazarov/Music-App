const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    artist:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    length:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Song', songSchema);