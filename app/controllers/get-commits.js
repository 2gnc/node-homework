// moment.unix(1521743919).format('DD-MMM-YYYY HH:mm:ss')
const moment = require('moment');
const config = require('../config');

moment.locale('ru');

/**
 * @desc По указанной ветке выдает массив ее коммитов.
 * @param {String} stdout текст с коммитами.
 * @returns {Array} Массив объектов - коммитов
 */

const getCommits = (stdout) => {
  const commits = stdout.split('++')
    .filter(itm => itm.length > 0)
    .map((item) => {
      let date;
      const arr = item.split(/\n/).filter(itm => itm.length > 0);
      if (arr[3]) {
        date = moment.unix(parseInt(arr[3])).format(config.repo.dateFormat);
      }
      return {
        commitHash: arr[0] || '',
        treeHash: arr[1] || '',
        comitter: arr[2] || '',
        timestamp: date || '',
        subject: arr[4] || '',
      };
    });
  return commits;
};
module.exports = getCommits;
