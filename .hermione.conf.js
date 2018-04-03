module.exports = {
  baseUrl: 'http://localhost:3333/branch/master',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',
  sets: {
    desktop: {
        files: 'app/hermione'
    }
  },
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
  },
};
