const execMock = (command, path) => {
  if (command === `git -C ${path} rev-parse master`) {
    return (
      'c81c54188f90b4aa6e3cbb80614d25647e8df2d3'
    );
  }
  if (command === `git -C ${path} branch`) {
    return (
      '* master\nuser-interface'
    );
  }
  if (command === `git -C ${path} log master --pretty=format:"%h--%t--%an--%at--%s++"`) {
    return (
      'c81c541--616308d--Ksenia Polyakova--1522154140--initial commit++'
    );
  }
  return command;
};

module.exports = execMock;
