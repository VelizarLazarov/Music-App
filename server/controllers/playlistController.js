const router = require('express').Router();
const playlistService = require('../services/playlistService');
const authService = require('../services/authService');

router.post('/createPlaylist/:userId', async (req,res) =>{
    let playlist = await playlistService.create(req.body)
    
    console.log(playlist)
    await authService.createPlaylist(req.params.userId, playlist._id)

    res.send(playlist)
})

router.get('/createdBy/:username', (req,res) => {
    authService.getUserPlaylists(req.params.username)
    .then(user => {
        res.send(user.playlists)
    })
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