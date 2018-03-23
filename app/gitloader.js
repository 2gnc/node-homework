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
      process.exec(`git log ${branch} --pretty=format:'%h\n%t\n%an\n%at\n%s++'`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }

}
module.exports = gitloader;
