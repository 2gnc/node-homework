const express = require('express');
const Gitloader = require('./gitloader');

const router = express.Router();
const gtl = new Gitloader();

router.get('/', (req, res) => {

  gtl.getBranches()
    .then((bra) => {
      bra.forEach((item) => {
        if (item.isDefault) {
          res.redirect(`/branch/${item.name}`);
        }
      });
    })
    .catch(err => console.log('что-то пошло не так: ', err));
});

router.get('/branch/:branch/', (req, res) => {

  let selectedBranch = req.params.branch;
  let branches;

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

router.get('/seefiles/:path', (req, res) => {

  const hash = (() => {
    const arr = req.params.path.split('&').reverse();
    return arr[0];
  })();

  const back = (() => {
    let arr = req.params.path
      .split('&')
      .reverse();
    arr.shift();
    arr = arr.reverse().join('&');
    return arr;
  })();

  gtl.getFilesTree(hash)
    .then((inn) => {
      res.render('files', {
        title: 'Просмотр файлов',
        repo: gtl.getPath(),
        files: inn,
        path: req.params.path,
        thisIs: hash,
        back,
      });
    })
    .catch(err => console.log('что-то пошло не так: ', err));
});

router.get('/file/:hash/:from', (req, res) => {
  gtl.openFile(req.params.hash)
    .then((fileText) => {
      console.log(fileText, req.params.from);
      res.render('file', {
        text: fileText,
        back: req.params.from,
      });
    })
    .catch(err => console.log('что-то пошло не так: ', err));
});

module.exports = router;
