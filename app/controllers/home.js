const Gitloader = require('../gitloader');

const gtl = new Gitloader();

module.exports = (req, res, next) => {
  gtl.getBranches()
    .then((branches) => {
      branches.forEach((item) => {
        if (item.isDefault) {
          res.redirect(`/branch/${item.name}`);
        }
      });
    })
    .catch(err => console.log('что-то пошло не так: ', err));
};
