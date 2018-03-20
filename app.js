const path = require('path');
const express = require('express');
const Gitloader = require('./gitloader');

const app = express();

// определяем шаблонизатор
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Проверка', 
    message: 'Hello there!',
  });
});

const gtl = new Gitloader();

module.exports = app;
