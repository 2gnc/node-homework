// вынести в отдельные функции обращения к git и парсинг результатов. 
// тестировать парсинг результатов?

const process = require('child_process');
const config = require('./config');
const moment = require('moment');

moment.locale('ru');


class gitloader {

  constructor() {
    this.config = config.repo;
    this.commands = {
      getHash: `git -C ${this.config.path} rev-parse`,
      getBranches: `git -C ${this.config.path} branch`,
      getCommits: `git -C ${this.config.path} log --pretty=format:"%h--%t--%an--%at--%s++"`,
      getFiles: `git -C ${this.config.path} ls-tree`,
      openFile: `git -C ${this.config.path} cat-file blob`,
    };
    this.process = require('child_process');
  }

  getPath() {
    return this.config.path;
  }

  /**
   * 
   * @param {String} command Текстовый шаблон команды из this.commands. 
   * @param {*} params Дополнительные параметры, необходимые для конкретной гит - команды.
   * @returns {*} Промис, который резолвится с текстом ответа got Cli.
   */
  gitExec(command, param) {
    return new Promise((resolve, reject) => {
      process.exec(`${command} ${param}`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }

  getBranchHash(bra) {
    return this.gitExec(this.commands.getHash, bra)
      .catch();
  }

  getBranches() {
    return new Promise((resolve, reject) => {
      this.process.exec(`${this.commands.getBranches}`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        const bra = stdout.replace('* ', '*')
          .split('\n')
          .filter(item => item.length > 0)
          .map((item) => {
            const itm = item.replace('\n', '');
            const name = itm.replace('*', '');
            const isDefault = itm.indexOf('*') !== -1;
            const link = `/branch/${name}`;
            return ({
              name,
              isDefault,
              link,
            });
          });
        resolve(bra);
      });
    });
  }

  getBranchCommits(bra) {
    return new Promise((resolve, reject) => {
      process.exec(`${this.commands.getCommits} ${bra}`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        const commits = stdout.split('++')
          .filter(item => item.length > 0)
          .map((item) => {
            let date;
            const arr = item.split('--')
              .filter(elt => elt.length > 0);
            if (arr[3]) {
              date = moment.unix(parseInt(arr[3]), 10)
                .format(config.repo.dateFormat);
            }
            return {
              commitHash: arr[0] || '',
              treeHash: arr[1] || '',
              comitter: arr[2] || '',
              timestamp: date || '',
              subject: arr[4] || '',
            };
          });
        resolve(commits);
      });
    });
  }

  getFilesTree(hash) {
    return new Promise((resolve, reject) => {
      process.exec(`${this.commands.getFiles} ${hash}`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        const filesAndCats = stdout.split('\n')
          .filter(item => item.length > 0)
          .map((item) => {
            const arr = item.split(' ');
            const file = arr[2].split('\t');
            return {
              type: arr[1],
              hash: file[0],
              filename: file[1],
            };
          });
        resolve(filesAndCats);
      });
    });
  }

  openFile(hash) {
    return new Promise((resolve, reject) => {
      process.exec(`${this.commands.openFile} ${hash}`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }

}
module.exports = gitloader;
