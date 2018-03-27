/* eslint-disable */

// Сценарии

// 2. По указанному пути можно перейти 
// 3. Выполняется получается 40-значный хэш
// 4. В списке веток одна и больше веток
// 5. В списке коммитов возвращается массив коммитов (от 0 и длиннее)
// 6. Возвращается список файлов в репозитории в корнеи этот список не пустой

const assert = require('assert');
const {expect} = require('chai');
const gitCli = require('./stab');
const gitLoader = require('../gitloader');


describe('Функции запросов в гит', () => {
    it('Путь должен быть указан и он должен быть строкой', () => {
      const git = new gitLoader();
      assert.equal(typeof(git.getPath()), 'string');
    });
});