const express = require('express');
const Gitloader = require('./gitloader');

const router = express.Router();
const gtl = new Gitloader();

let selectedBranch;
let branches;


router.get('/', (req, res) => {
  gtl.getBranches()
    .then((bra) => {
      bra.forEach((item) => {
        if (item.isDefault) {
          selectedBranch = item.name;
          res.redirect(`/branch/${item.name}`);
        }
      });
    })
    .catch(err => console.log('что-то пошло не так: ', err));
});

router.get('/branch/:branch/', (req, res) => {

  selectedBranch = req.params.branch;

  if (!branches) {
    gtl.getBranches()
      .then((bra) => {
        branches = bra;
        bra.forEach((el) => {
          if (el.isDefault) {
            selectedBranch = el.name;
          }
        
        });
      })
      .catch(err => console.log('что-то пошло не так: ', err));
  }

  gtl.getBranchCommits(req.params.branch)
    .then((obj) => {
      res.render('index', {
        title: 'Просмотр репозитория',
        branches,
        commits: obj,
        repo: gtl.getPath(),
        selectedBranch,
      });
    })
    .catch(err => console.log('что-то пошло не так: ', err)); 
});

router.get('/seefiles/:hash/', (req, res) => {
  gtl.getFilesTree(req.params.hash)
    .then((inn) => {
      res.render('files', {
        title: 'Просмотр файлов',
        repo: gtl.getPath(),
        files: inn,
        hash: req.params.hash,
        from: '',
      });
    })
    .catch(err => console.log('что-то пошло не так: ', err));
  // выполнить команду гита 
  // получить и обработать портянку с ответом гита
  // отрендерить шаблон (files.pug)
});

module.exports = router;
