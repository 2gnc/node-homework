const path = require('path');
const express = require('express');
const index = require('./routes');

const app = express();

// определяем шаблонизатор
app.set('views', path.join('app/views'));
app.set('view engine', 'pug');

app.use(express.static(path.join('public')));

app.use('/', index);

module.exports = app;
