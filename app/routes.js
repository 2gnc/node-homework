const express = require('express');
const Gitloader = require('./gitloader');
const branchDisplay = require('./controllers/display-branch');
const commitsDisplay = require('./controllers/get-commits');

const router = express.Router();
const gtl = new Gitloader();

let selectedBranch;

// router.use((req, res, next) => {
//   // специфический обработчик именно для этого маршрута
//   /* ... */
//   // next(); передает управление дальше
//   next();
// });

router.get('/', (req, res) => {
  gtl.getBranches()
    .then((stdout) => {
      const branches = branchDisplay(stdout);
      res.render('index', {
        title: 'Проверка2',
        message: 'Ветки:',
        branches,
        repo: gtl.getPath(),
      });

      return branches;
    })
    .then((branches) => {
      branches.forEach((el) => {
        if (el.isDefault) {
          selectedBranch = el.name;
        }
      });
    })
    .then(() => {
      gtl.getBranchCommits(selectedBranch)
        .then((stdout) => {
          // тут вернется массив объектов - коммитов
          // сюда или позже перенести рендер
          commitsDisplay(stdout);
        });
    })
    .catch((stderr) => {
      console.log('что-то пошло не так: ', stderr);
    });
});

module.exports = router;
