const Gitloader = require('../gitloader');

const gtl = new Gitloader();

module.exports = (req, res, next) => {
  let selectedBranch = req.params.branch;
  let branches;

  let stepOne = gtl.getBranches();
  let stepTwo = gtl.getBranchCommits(req.params.branch);

  Promise.all([stepOne, stepTwo])
    .then((val) => {
      branches = val[0];
      
      val[0].forEach((el) => {
        if (el.isDefault) {
          selectedBranch = el.name;
        }
      });

      res.render('index', {
        title: 'Просмотр репозитория',
        branches,
        commits: val[1],
        repo: gtl.getPath(),
        selectedBranch,
      })
    })
    .catch(err => console.log('что-то пошло не так: ', err));
};
