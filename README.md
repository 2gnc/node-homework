# домашнее задание к теме Node js

В качестве шаблонизатра использован Pug

Стили находятся в статическом файле и приведены для примера.

Приложение работает следующим образом: 
* В конфигурационном файле указан порт, хост, путь к локальному репозиторию и формат отображения даты
* Для преображения дат использован moment js
* Все необходимые команды для git собраны в файле gitloader.js в виде методов класса gitloader. Каждый метод возвращает промис.

### Точки входа
* /branch/:имя-ветки (просмостр спсика веток и коммитов)
* /seefiles/:ветка-или-хэш (просмотр файлов и папок)
* /file/:хэш/:путь-откуда-открыт-файл (просмотр содержимого файла)

### интерфейс приложения 

На главной странице происходит проверка, какая ветка репозитория сейчас в рабочей директории и по результату происходит редирект на страницу этой ветки. На странице ветки по умочанию отображен ее список коммитов и все имеющиеся в репозитории ветки. С этой страницы можно: 
* посмотреть список коммитов каждой ветки
* посмотреть список файлов каждой ветки
* в списке коммитов перейти к файловой структуре этого коммита

На странице файловой структуры выведен список файлов и папок ветки или конктретного коммита.
* При клике на папку - переход внутрь этой папки
* ссылка "вверх" - переход в папку уровнем выше
* если открыта корневая директория ссылка "вверх" не отображается
* при клике на файл - переход к просмотру этого файла
* ссылка "к списку" - переход к просмотру файловой структуры (тот уровень с которого был открыт файл)

На всех страница клик по ссылке "Просмотр репозитория" - переход на главную страницу.