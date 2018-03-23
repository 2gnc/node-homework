// moment.unix(1521743919).format('DD-MMM-YYYY HH:mm:ss')

/**
 * @desc По указанной ветке выдает массив ее коммитов.
 * @param {String} stdout текст с коммитами.
 * @returns {Array} Массив объектов - коммитов
 */

const getCommits = (stdout) => {

  const commits = stdout.split('++')
    .filter(itm => itm.length > 0)
    .map((item) => {
      const arr = item.split(/\n/).filter(itm => itm.length > 0);
      return {
        commitHash: arr[0],
        treeHash: arr[1],
        comitter: arr[2],
        timestamp: arr[3],
        subject: arr[4],
      };
    });
  return commits;
};
module.exports = getCommits;
