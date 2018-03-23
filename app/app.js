const path = require('path');
const express = require('express');
const routes = require('./routes');
const config = require('./config');

const app = express();

// определяем шаблонизатор
app.set('views', path.join('app/views'));
app.set('view engine', 'pug');
// статические файлы
app.use(express.static(path.join('public')));

app.use('/', routes);

app.listen(config.app.port, config.app.host, () => {
  console.log(`Слушаю порт ${config.app.port} на хосте ${config.app.host}`);
}); 

module.exports = app;
