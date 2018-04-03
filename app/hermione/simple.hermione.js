const assert = require('assert');

describe('Title', () => {
  it('Загрузка главной страницы. Проверка по title.', function () {
      return this.browser
          .url('/')
          .getTitle()
          .then((title) => {
              assert.equal(title, 'Просмотр репозитория');
          });
  });

  it('должна отображаться ветка по-умолчанию', function() {
    return this.browser
        .url('/')
        .isExisting('.branch_default')
        .then((exists) => {
            return assert.ok(exists, 'ветка по умолчанию не отображается')
        })
});

});
