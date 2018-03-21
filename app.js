const express = require('express');
const Gitloader = require('./gitloader');
const index = require('./routes/index');

const app = express();

// определяем шаблонизатор
app.set('view engine', 'pug');

app.use('/', index);

const gtl = new Gitloader();

module.exports = app;
