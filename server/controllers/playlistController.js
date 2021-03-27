const router = require('express').Router();
const playlistService = require('../services/playlistService');

router.get('/:id/details', (req,res) =>{
    playlistService.getOne(req.params.id)
    .then(pl => {
        res.send(pl)
    })
    .catch(err => console.log(err))
})

router.post('/:id/addSong', (req,res) => {
    const songObj = {
        title: req.body.title,
        artist: req.body.artist,
        songUrl: req.body.songUrl
    }
    playlistService.createSong(songObj)
    .then(song => {
        playlistService.addSongToList(req.params.id, song._id)
        .then(()=>res.end())
    })
})


module.exports = router