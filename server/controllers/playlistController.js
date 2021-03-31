const router = require('express').Router();
const playlistService = require('../services/playlistService');
const authService = require('../services/authService');

router.post('/createPlaylist', (req,res) =>{
    playlistService.create(req.body)
    .then(pl => res.send(pl))
    .catch(err => console.log(err))
})

router.get('/:id/details', (req,res) =>{
    playlistService.getOne(req.params.id)
    .then(pl => {
        res.send(pl)
    })
    .catch(err => console.log(err))
})

router.get('/:songId/like/:userId', async (req,res) => {
    await playlistService.updateOne(req.params.songId)
    await authService.addLikedList(req.params.userId, req.params.songId)

    res.end()
    
    
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