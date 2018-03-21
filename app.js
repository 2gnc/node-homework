const express = require('express');
const index = require('./routes/index');

const app = express();

// определяем шаблонизатор
app.set('view engine', 'pug');

app.use('/', index);

module.exports = app;
