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
      const isDefault = (item[0] === '*');
      return (
        {
          name: item.replace('*', ''),
          isDefault,
        }
      );
    });
  return bra;
};

module.exports = displayBranches; 
