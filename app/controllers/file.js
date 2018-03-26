const Gitloader = require('../gitloader');
const gtl = new Gitloader();

module.exports = (req, res, next) => {
    gtl.openFile(req.params.hash)
      .then((fileText) => {
        res.render('file', {
          text: fileText,
          back: req.params.from,
        });
      })
      .catch(err => console.log('что-то пошло не так: ', err));
  };
