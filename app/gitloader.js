const process = require('child_process');
const config = require('./config');

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

  getBranchCommits(branch) {
    return new Promise((resolve, reject) => {
      process.exec(`git log ${branch} --pretty=format:'%h\n%t\n%an\n%at\n%s++'`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }

  getFilesTree(hash) {
    return new Promise((resolve, reject) => {
      process.exec(`git -C ${this.config.path} ls-tree ${hash}`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }

}
module.exports = gitloader;
