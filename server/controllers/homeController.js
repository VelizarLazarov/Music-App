const router = require('express').Router();
const playlistService = require('../services/playlistService');

let plObj = {
    title: 'metal music',
    imgUrl: 'https://lh3.googleusercontent.com/proxy/OszddjV-ztO6ve9DH_w2zsgxubvgWROUp_D8w3JjNbUXKh_WsUtuoeM2CKo9YNOGRi3KV2_qxnNtxJ2hgsmdOOVFiNmC',
    likes: 0,
    songs: []
}

router.get('/', (req, res) => {
    /* playlistService.create(plObj)
    .then(() => {
        
        res.send("h")
    }); */
    playlistService.getAll()
    .then(pl => {
        res.send(pl)
    })
    .catch(err => console.log(err))
})

module.exports = router