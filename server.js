const express = require('express');
const config = require('./config');
const app = require('./app');

app.listen(config.app.port, () => {
  console.log(`Слушаю порт ${config.app.port}`);
});

