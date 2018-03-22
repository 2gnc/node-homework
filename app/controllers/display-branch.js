/**
 * @description Обрабатывает строку с ветками, возвращает массив объектов - веток. 
 * @param {String} branches Все найденные командой ветки.
 * @returns {Aray}  
 */

const displayBranches = (branch) => {
  const bra = branch.replace('* ', '*')
    .split(' ')
    .filter(item => item.length > 0)
    .map((item) => {
      const name = item.replace('*', '');
      const isDefault = (item[0] === '*');
      const link = `#branch-${name}`;
      return (
        {
          name,
          isDefault,
          link,
        }
      );
    });

  return bra;
};

module.exports = displayBranches; 
