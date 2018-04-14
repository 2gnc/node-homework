function controllerFactory(loader) {
  return (req, res, next) => {
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

    loader.getFilesTree(hash)
      .then((inn) => {
        res.render('files', {
          title: 'Просмотр файлов',
          repo: loader.getPath(),
          files: inn,
          path: req.params.path,
          thisIs: hash,
          back,
        });
      })
      .catch(err => next(err));
  };
}

module.exports = controllerFactory;
