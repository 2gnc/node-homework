
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

  console.log(filesAndCats);
  return filesAndCats;
};
module.exports = getFilesTree;
