const router = require('express').Router();
const playlistService = require('../services/playlistService');
const authService = require('../services/authService');

router.patch('/:id/update', (req,res) =>{
        let title = req.body.title
        let imgUrl = req.body.imgUrl

    playlistService.updatePlaylist(req.params.id, title, imgUrl)
    .then(() => res.end())
    .catch(err => console.log(err))
})

router.post('/createPlaylist/:username', async (req,res) =>{
    let creator = await authService.getUser(req.params.username)
    let playlist = await playlistService.create(req.body, creator._id)
    
    await authService.createPlaylist(req.params.username, playlist._id)

    res.send(playlist)
})

router.get('/createdBy/:username', (req,res) => {
    authService.getUserPlaylists(req.params.username)
    .then(user => {
        res.send(user.playlists)
    })
    .catch(err => console.log(err))
})

router.delete('/:listId/delete/:songId', (req,res) => {
    playlistService.deleteSong(req.params.listId, req.params.songId)
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
    await playlistService.likePlaylist(req.params.songId)
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
    .catch(err => console.log(err))
})


module.exports = router