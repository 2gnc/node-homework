/**
 * @description Обрабатывает строку с ветками, возвращает массив объектов - веток. 
 * @param {String} branches Все найденные командой ветки.
 * @returns {Aray}  
 */

const displayBranches = (branch) => {
  const brnch = branch.replace('* ', '*')
    .split(' ')
    .filter(item => item.length > 0);

  return brnch;
};

module.exports = displayBranches; 
