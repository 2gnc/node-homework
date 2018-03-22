// moment.unix(1521743919).format('DD-MMM-YYYY HH:mm:ss')

/**
 * @desc По указанной ветке выдает массив ее коммитов.
 * @param {String} stdout текст с коммитами.
 * @returns {Array} Массив объектов - коммитов
 */

const getCommits = (stdout) => {
  const rCommit = /(?<=cHsh ).*(?=cHsh)/;
  const rTree = /(?<=tHsh ).*(?=tHsh)/;
  const rAut = /(?<=aut ).*(?=aut)/;
  const rTime = /(?<=time ).*(?=time)/;
  const rSubj = /(?<=subj ).*(?=subj)/;

  let commits = stdout.split('++').map((item) => {
    return {
      commitHash: rCommit.exec(item),
      treeHash: rTree.exec(item),
      comitter: rAut.exec(item),
      timestamp: rTime.exec(item),
      subject: rSubj.exec(item),  
    }
  });
  return commits;
};
module.exports = getCommits;
