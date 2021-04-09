const router = require('express').Router();
const _ = require('lodash');
const playlistService = require('../services/playlistService');


router.get('/', (req, res) => {
    playlistService.getAll()
    .then(pl => {
        res.send(pl)
        
    })
    .catch(err => console.log(err))
})

router.get('/:sort', (req, res) => {

    playlistService.getAll()
    .then(pl => {

        if(req.params.sort === "popular"){
            pl =  _.reverse(_.sortBy(pl,'likes'))
        }else if(req.params.sort === "recent"){
            pl = pl.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
        }
        res.send(pl)
        
    })
    .catch(err => console.log(err))
})

module.exports = router