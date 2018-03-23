const express = require('express');
const Gitloader = require('./gitloader');
const branchDisplay = require('./controllers/display-branch');
const commitsDisplay = require('./controllers/get-commits');

const router = express.Router();
const gtl = new Gitloader();

let selectedBranch;
let branches;

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
            title: 'Просмотр репозитория',
            branches,
            commits,
            repo: gtl.getPath(),
            selectedBranch,
          });
        });
    })
    .catch(err => console.log('что-то пошло не так: ', err));
});

router.get('/branch/:branch/', (req, res) => {
  selectedBranch = req.params.branch;

  if(!branches) {
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
      .catch(err => console.log('что-то пошло не так: ', err));
  }

  gtl.getBranchCommits(req.params.branch)
    .then((commitsRaw) => {
      const commits = commitsDisplay(commitsRaw);
      res.render('index', {
        title: 'Просмотр репозитория',
        branches,
        commits,
        repo: gtl.getPath(),
        selectedBranch,
      });
    })
    .catch(err => console.log('что-то пошло не так: ', err));
});

router.get('/branchfiles/:branch', () => {

});

module.exports = router;
