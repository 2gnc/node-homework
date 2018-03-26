const process = require('child_process');
const config = require('./config');
const moment = require('moment');

moment.locale('ru');


class gitloader {

  constructor() {
    this.config = config.repo;
  }

  getPath() {
    return this.config.path;
  }

  getBranchHash(bra) {
    return new Promise((resolve, reject) => {
      process.exec(`git -C ${this.config.path} rev-parse ${bra}`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }

  getBranches() {
    return new Promise((resolve, reject) => {
      process.exec(`git -C ${this.config.path} branch`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        const bra = stdout.replace('* ', '*')
          .replace('\n', ' ')
          .split(' ')
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
      process.exec(`git log ${bra} --pretty=format:"%h--%t--%an--%at--%s++"`, (error, stdout, stderr) => {  
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
      process.exec(`git -C ${this.config.path} ls-tree ${hash}`, (error, stdout, stderr) => {
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
      process.exec(`git -C ${this.config.path} cat-file blob ${hash}`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }

}
module.exports = gitloader;
