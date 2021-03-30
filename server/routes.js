const router = require('express').Router();
const homeController = require('./controllers/homeController');
const playlistController = require('./controllers/playlistController');
const authController = require('./controllers/authController');

const isAuth = require('./middlewares/isAuthorised');

router.use('/', homeController)
router.use('/playlist', playlistController)
router.use('/auth', authController)

module.exports = router