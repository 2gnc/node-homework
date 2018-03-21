const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  // специфический обработчик именно для этого маршрута
  /* ... */
  // next(); передает управление дальше
  next();
});

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Проверка2',
    message: 'Привет, я роутер',
  });
});

module.exports = router;
