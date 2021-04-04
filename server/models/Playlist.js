const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    likes:{
        type:Number
    },
    creator:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    songs:[{
        type:mongoose.Types.ObjectId,
        ref:'Song'
    }]
}, { timestamps: true })

module.exports = mongoose.model('Playlist', playlistSchema)