const express = require('express');
const { PORT } = require('./config/config');
const routes = require('./routes');

require('./config/mongoose')
const app = express();
require('./config/express')(app)
app.use('/', function(req, res, next) {
    res.header({"Access-Control-Allow-Origin": "*"});
    res.header({"Access-Control-Allow-Headers": "*"});
    res.header({"Access-Control-Allow-Methods": "*"})
    next()
});
app.use(routes);

app.listen(PORT, () => {console.log(`running on ${PORT}`)})