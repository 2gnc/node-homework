const process = require('child_process');
const config = require('./config');

class gitloader {
  constructor() {
    this.config = config.repo;
  }

  getBranches() {
    return new Promise((resolve, reject) => {
      process.exec(`cd ${this.config.path} && git branch`, (error, stdout, stderr) => {
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }
}

module.exports = gitloader;
