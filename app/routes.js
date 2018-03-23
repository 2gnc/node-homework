const express = require('express');
const Gitloader = require('./gitloader');
const branchDisplay = require('./controllers/display-branch');
const commitsDisplay = require('./controllers/get-commits');

const router = express.Router();
const gtl = new Gitloader();

let selectedBranch;
let branches;

// router.use((req, res, next) => {
//   // специфический обработчик именно для этого маршрута
//   /* ... */
//   // next(); передает управление дальше
//   next();
// });

router.get('/', (req, res) => {
  gtl.getBranches()
    .then((stdout) => {
      branches = branchDisplay(stdout);
      return branches;
    })
    .then((bra) => {
      bra.forEach((el) => {
        if (el.isDefault) {
          selectedBranch = el.name;
        }
      });
    })
    .then(() => {
      gtl.getBranchCommits(selectedBranch)
        .then((stdout) => {
          // тут вернется массив объектов - коммитов
          const commits = commitsDisplay(stdout);
          res.render('index', {
            title: 'Проверка2',
            message: 'Ветки:',
            branches,
            commits,
            repo: gtl.getPath(),
          });
        });
    })
    .catch((stderr) => {
      console.log('что-то пошло не так: ', stderr);
    });
});

module.exports = router;
