function controllerFactory(loader) {
  return (req, res, next) => {

    let selectedBranch = req.params.branch;
    let branches;
    let obj;

    const stepOne = loader.getBranches();
    const stepTwo = loader.getBranchCommits(req.params.branch);

    Promise.all([stepOne, stepTwo])
      .then((val) => {
        [branches, obj] = val;

        val[0].forEach((el) => {
          if (el.isDefault) {
            selectedBranch = el.name;
          }
        });

        res.render('index', {
          title: 'Просмотр репозитория',
          branches,
          commits: obj,
          repo: loader.getPath(),
          selectedBranch,
        });
      })
      .catch(err => next(err));
  };
}

module.exports = controllerFactory;
