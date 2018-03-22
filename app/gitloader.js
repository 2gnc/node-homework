// git log branch-name --pretty=format:'%H %T %an %at /%s/' хэш коммита, хэш tree, имя автора, дата(unix timestamp), /тема/

const process = require('child_process');
const config = require('./config');

class gitloader {

  constructor() {
    this.config = config.repo;
  }

  getPath() {
    return this.config.path;
  }

  getBranches() {
    return new Promise((resolve, reject) => {
      process.exec(`git -C ${this.config.path} branch`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }

  getBranchCommits(branch) {
    return new Promise((resolve, reject) => {
      process.exec(`git log ${branch} --pretty=format:'(cHsh %H cHsh) (tHsh %T tHsh) (aut %an aut) (time %at time) (subj %s subj)++'`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }

}
module.exports = gitloader;
