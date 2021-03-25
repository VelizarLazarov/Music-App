const express = require('express');
const { PORT } = require('./config/config');
const routes = require('./routes');

require('./config/mongoose')
const app = express();
require('./config/express')(app)
app.all('/', function(req, res, next) {
    res.header({"Access-Control-Allow-Origin": "http://localhost:3000"});
    res.header({"Access-Control-Allow-Headers": "X-Requested-With"});
    next()
});
app.use(routes);

app.listen(PORT, () => {console.log(`running on ${PORT}`)})