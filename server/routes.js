const router = require('express').Router();
const homeController = require('./controllers/homeController');
const playlistController = require('./controllers/playlistController');

const isAuth = require('./middlewares/isAuthorised');

router.use('/', homeController)
router.use('/playlist', playlistController)

module.exports = router