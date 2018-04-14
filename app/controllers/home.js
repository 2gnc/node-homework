function controllerFactory(loader) {
  return (req, res, next) => {
    loader.getBranches()
      .then((branches) => {
        branches.forEach((item) => {
          if (item.isDefault) {
            res.redirect(`/branch/${item.name}`);
          }
        });
      })
      .catch(err => next(err));
  };
}

module.exports = controllerFactory;
