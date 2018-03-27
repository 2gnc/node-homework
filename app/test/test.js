/* eslint-disable */

// Сценарии

// 4. В списке веток одна и больше веток
// 5. В списке коммитов возвращается массив коммитов (от 0 и длиннее)
// 6. Возвращается список файлов в репозитории в корнеи этот список не пустой

const assert = require('assert');
const {expect} = require('chai');
const gitCli = require('./stab');
const gitLoader = require('../gitloader');


describe('Функции запросов в гит', () => {

  const gitL = new gitLoader();

    it('Путь должен быть указан и он должен быть строкой', () => {
      assert.equal(typeof(gitL.getPath()), 'string');
    });

    it('Можно получить хэш ветки', async () => {
      const path = gitL.getPath();
      
      let testHash = await gitL.getBranchHash('master');
      assert.equal(testHash.length > 40, true);
    });

    it('в списке веток не меньше одной ветки', () => {
      // получить список веток
      // 
    });
});