const Gitloader = require('../gitloader');
const gtl = new Gitloader();

module.exports = (req, res, next) => {
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
}
