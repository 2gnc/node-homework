/**
 * @description Обрабатывает строку с ветками, возвращает массив объектов - веток. 
 * @param {String} branches Все найденные командой ветки.
 * @returns {Aray}  
 */

const displayBranches = (branch) => {
  const re = /\n/;
  const bra = branch.replace('* ', '*')
    .replace(re, ' ')
    .split(' ')
    .filter(item => item.length > 0)
    .map((item) => {
      let itm = item.replace(re, '');
      const name = itm.replace('*', '');
      const isDefault = itm.indexOf('*') !== -1;
      const link = `#branch-${name}`;
      return ({
        name,
        isDefault,
        link,
      });
    });

  return bra;
};

module.exports = displayBranches; 
