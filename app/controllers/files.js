const Gitloader = require('../gitloader');
const gtl = new Gitloader();

module.exports = (req, res, next) => {
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
}
