const { expect } = require('chai');
const sinon = require('sinon');
const chai = require('chai');
const Gl = require('../gitloader');

chai.use(require('sinon-chai'));

const config = {
  repo: {
    dateFormat: 'DD MMM YYYY HH:mm',
    path: '/test',
  },
};

class TestGtl extends Gl {
  constructor() {
    super();
    this.config = config.repo;
  }

}

describe('gitLoader', () => {
  it('getPath() в качестве пути возващается строка', () => {
    const gtlToTest = new TestGtl();
    const testPath = gtlToTest.getPath();
    expect(testPath).to.equal('/test');
  });

  it('gitExec возвращает промис', (done) => {
    /**
     * тут не получилось придумать, как понять, что это промис
     */
    const gtlToTest = new TestGtl();
    
    const myAPI = {
      exec: () => Promise.resolve('test'),
    };
    const process = sinon.mock(myAPI);
    const test = typeof(gtlToTest.gitExec().catch());
    
    setTimeout(() => {
      expect(test).to.equal('object');
    }, 0);
    done();
  });

  it('getBranches правильно парсит ответ git cli', (done) => {

    const gtlToTest = new TestGtl();

    const myAPI = {
      exec: () => {
        console.log(444);
        return ('* master\nui');
      },
    };
    const process = sinon.stub();

    gtlToTest.getBranches().then((out) => {
      console.log(out);

    }).then(() => {
      done();
    });

  });
});
