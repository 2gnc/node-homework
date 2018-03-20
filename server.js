const express = require('express');
const config = require('./config');
const Gitloader = require('./gitloader');

const app = express();
const gtl = new Gitloader();

app.listen(config.app.port, () => {
  console.log(`Слушаем порт ${config.app.port}`);
});
