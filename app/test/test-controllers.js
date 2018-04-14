const { expect } = require('chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const chai = require('chai');
const sinon = require('sinon');

chai.use(require('sinon-chai'));

const branchFactory = require('../controllers/branch');
const fileFactory = require('../controllers/file');
const filesFactory = require('../controllers/files');
const homeFactory = require('../controllers/home');

describe('Роуты', () => {

  it('роут /branch вызывает res.render() с правильными параметрами если все его колбэки зарезолвелись успешно', () => {

    const gitLoaderStub = {
      getPath: () => '//',
      getBranches: () => Promise.resolve([{
        name: 'master',
        isDefault: true,
        link: 'test',
      }]),
      getBranchCommits: () => Promise.resolve([{
        commitHash: 'commitHash',
        treeHash: 'treeHash',
        comitter: 'comitter',
        timestamp: 'timestamp',
        subject: 'subject',
      }]),
    };

    const branchRoute = branchFactory(gitLoaderStub);

    const request = {
      params: {
        branch: 'master',
      },
    };

    const req = mockReq(request);
    const res = mockRes({
      render: sinon.spy(),
    });
    const next = sinon.stub();

    branchRoute(req, res, next);

    setTimeout(() => {
      expect(res.render).to.be.calledWith('index', { 
        title: 'Просмотр репозитория',
        selectedBranch: "master",
        repo: "//",
        branches: [{ isDefault: true, link: "test", name: "master" }],
        commits: [{
          comitter: "comitter",
          commitHash: "commitHash",
          subject: "subject",
          timestamp: "timestamp",
          treeHash: "treeHash"
        }],
      });
    }, 0);
  });

  it('роут /branch вызывает nex(err) если произошла ошибка', () => {
    const gitLoaderStub = {
      getPath: () => '//',
      getBranches: () => Promise.reject('test error'),
      getBranchCommits: () => Promise.reject('test error'),
    };

    const branchRoute = branchFactory(gitLoaderStub);

    const req = mockReq();
    const res = mockRes({
      render: sinon.stub(),
    });

    const next = sinon.spy();

    branchRoute(req, res, next);

    setTimeout(() => {
      expect(next).to.be.calledWith('test error');
    }, 0);
  });

  it('роут /file должен вызывать метод render с правильными параметрами, если ображение к git cli выполнено успешно', () => {

    const gitLoaderStub = {
      openFile: () => Promise.resolve({
        text: 'test',
        back: 'test',
      }),
      getBranches: () => Promise.resolve(),
      getBranchCommits: () => Promise.resolve(),
    };

    const branchRoute = fileFactory(gitLoaderStub);

    const request = {
      params: {
        hash: 'test',
      },
    };

    const req = mockReq(request);
    const res = mockRes({
      render: sinon.spy(),
    });
    const next = sinon.stub();

    branchRoute(req, res, next);

    setTimeout(() => {
      expect(res.render).to.be.calledWith('file', {
        back: undefined,
        text: { back: 'test', text: 'test' },
      });
    }, 0);

  });

  it('роут /file должен вызывать метод next(err) если обращение к git cli выполнено с ошибкой', () => {

    const gitLoaderStub = {
      openFile: () => Promise.reject('err'),
    };

    const branchRoute = fileFactory(gitLoaderStub);

    const req = mockReq();
    const res = mockRes({
      render: sinon.stub(),
    });
    const next = sinon.spy();

    branchRoute(req, res, next);

    setTimeout(() => {
      expect(next).to.be.calledWith('err');
    }, 0);

  });

  it('роут /files должен вызывать метод render() с правильными параметрами если обращение к git выполнено успешно', () => {

    const gitLoaderStub = {
      getFilesTree: () => Promise.resolve([{
        type: 'blob',
        hash: '000',
        filename: 'some',
      }]),
      getPath: () => '//',
    };

    const request = {
      params: {
        hash: 'test',
        path: 'test',
      },
    };

    const req = mockReq(request);
    const res = mockRes({
      render: sinon.spy(),
    });
    const next = sinon.stub();

    const filesRoute = filesFactory(gitLoaderStub);
    filesRoute.hash = () => { 'test'; };
    filesRoute.back = () => { 'test'; };

    filesRoute(req, res, next);

    setTimeout(() => {
      expect(res.render).to.be.calledWith('files', {
        title: 'Просмотр файлов',
        repo: '//',
        files: [{
          type: 'blob',
          hash: '000',
          filename: 'some',
        }],
        path: 'test',
        thisIs: 'test',
        back: '',
      });
    }, 0);

  });

  it('роут /files должен вызывать метод next(err) если обращение к git выполнено с ошибкой', () => {
    const gitLoaderStub = {
      getFilesTree: () => Promise.reject('err'),
    };

    const request = {
      params: {
        hash: 'test',
        path: 'test',
      },
    };

    const req = mockReq(request);
    const res = mockRes({
      render: sinon.stub(),
    });
    const next = sinon.spy();

    const filesRoute = filesFactory(gitLoaderStub);
    filesRoute.hash = () => { 'test'; };
    filesRoute.back = () => { 'test'; };

    filesRoute(req, res, next);

    setTimeout(() => {
      expect(next).to.be.calledWith('err');
    }, 0);

  });

  it('роут /home должен вызывать метод res.redirect()', () => {
    const gitLoaderStub = {
      getBranches: () => Promise.resolve([{
        name: 'master',
        isDefault: true,
        link: 'test',
      }]),
    };

    const req = mockReq();
    const res = mockRes({
      redirect: sinon.spy(),
    });
    const next = sinon.stub();
    const homeRoute = homeFactory(gitLoaderStub);

    homeRoute(req, res, next);
    setTimeout(() => {
      expect(res.redirect).to.be.calledWith('/branch/master');
    }, 0);
  });

  it('роут /home должен вызывать метод next(err) если промис выполнен с ошибкой', () => {
    const gitLoaderStub = {
      getBranches: () => Promise.reject('err'),
    };

    const req = mockReq();
    const res = mockRes({
      redirect: sinon.stub(),
    });
    const next = sinon.spy();
    const homeRoute = homeFactory(gitLoaderStub);

    homeRoute(req, res, next);

    setTimeout(() => {
      expect(next).to.be.calledWith('err');
    }, 0);
  });

});

