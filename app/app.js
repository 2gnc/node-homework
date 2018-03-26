const path = require('path');
const express = require('express');
const routes = require('./routes');
const config = require('./config');
const Gitloader = require('./gitloader');

const gtl = new Gitloader();
const app = express();

app.set('views', path.join('app/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join('public')));

app.use('/', routes);

app.use((err, req, res, next) => {
  res.status(500).send(res.render('error.pug', {
    repo: gtl.getPath(),
    msg: err,
  }));
});

app.listen(config.app.port, config.app.host);

module.exports = app;
