function controllerFactory(loader) {
  return (req, res, next) => {
    loader.openFile(req.params.hash)
      .then((fileText) => {
        res.render('file', {
          text: fileText,
          back: req.params.from,
        });
      })
      .catch(err => next(err));
  };
}

module.exports = controllerFactory;
