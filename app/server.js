const config = require('./config');
const app = require('./app');

app.listen(config.app.port, config.app.host, () => {
  console.log(`Слушаю порт ${config.app.port} на хосте ${config.app.host}`);
});

