const router = require('express').Router();
const authService = require('../services/authService');
const { COOKIE_NAME } = require('../config/config');

router.post('/register', (req,res) => {
    let {username,password} = req.body;
    
    authService.register(username,password)
    .then(() => {
        res.end();
    })
    .catch(err => console.log(err))
})

router.get('/getUser/:username', (req,res) => {
    authService.getUser(req.params.username)
    .then(user => {
        res.send(user)
    })
})

router.post('/login',(req,res) => {
    let { username, password } = req.body;
    
    authService.login(username,password)
    .then(token => {
        res.send({token})               
    })
    .catch(err => console.log(err))
})
module.exports = router;