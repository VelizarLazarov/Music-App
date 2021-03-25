const router = require('express').Router();
const homeController = require('./controllers/homeController');

const isAuth = require('./middlewares/isAuthorised');

router.get('/', homeController)

module.exports = router