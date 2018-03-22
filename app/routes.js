const express = require('express');
const Gitloader = require('./gitloader');

const router = express.Router();
const gtl = new Gitloader();

router.use((req, res, next) => {
  // специфический обработчик именно для этого маршрута
  /* ... */
  // next(); передает управление дальше
  next();
});

router.get('/', (req, res) => {

  gtl.getBranches()
    .then((stdout) => {
      let branches = stdout;
      branches = branches.replace('* ', '*').split(' ').filter(item => item.length > 0);
      
      res.render('index', {
        title: 'Проверка2',
        message: 'Ветки:',
        branches,
      });
    })
    .catch((stderr) => {
      console.log('что-то пошло не так: ', stderr);
    });

});

module.exports = router;
