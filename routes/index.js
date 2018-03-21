const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  console.log('специфический обработчик именно для этого маршрута');
  next();
});

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Проверка2',
    message: 'Привет, я роутер',
  });
});

module.exports = router;
