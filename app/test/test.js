/* eslint-disable */

// Сценарии
//  TOOD
// 7. ветки парсятся правильно
// 8. коммиты парсятся правильно

const assert = require('assert');
const {expect} = require('chai');
const gitStab = require('./stab');
const gitLoader = require('../gitloader');

class fakeGitLoader extends gitLoader {
  runCommand(command) {
    return (
      gitStab()
    );
  };
};
const fakeGit = new fakeGitLoader();

describe('Функции запросов в гит (gitLoader)', () => {

  const gitL = new gitLoader();

    it('Путь должен быть указан и он должен быть строкой', () => {
      assert.equal(typeof(gitL.getPath()), 'string');
    });

    it('Можно получить хэш ветки', async () => {
      const path = gitL.getPath();
      const testHash = await gitL.getBranchHash('master');
      assert.equal(testHash.length > 40, true);
    });

    it('в списке веток не меньше одной ветки', async () => {
      const branches = await gitL.getBranches();
      assert.equal(branches.length >= 1, true); 
    });

    it('можем получить массив коммитов', async () => {
      // так можно? Или это уже интеграционный тест?
      const branch = await gitL.getBranches();
      const branchname = branch[0].name;
      const commits = await gitL.getBranchCommits(branchname);
      assert.equal(Boolean(commits.length), true);
    });
});