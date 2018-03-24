/**
 * 
 * @param {String} input Результат выполенния команды git ls-tree 
 * @returns {Object} Разобранная по файлам/папкам команда
 */

const getFilesTree = (input) => {
  const filesAndCats = input.split('\n')
    .filter(itm => itm.length > 0)
    .map((item) => {
      const arr = item.split(' ');
      const file = arr[2].split('\t');
      return {
        type: arr[1],
        hash: file[0],
        filename: file[1],
      };
    });

  return filesAndCats;
};
module.exports = getFilesTree;
