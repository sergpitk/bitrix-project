# bitrix-project
Заготовка для новых проектов на Битрикс

## Из чего состоит:

```
.
├── .arclint
├── .babelrc
├── composer.json
├── composer.lock
├── core
│   └── local
│       ├── frontend-build-example
│       ├── php_interface
│       └── templates
├── deploy.php
├── .editorconfig
├── .eslintrc
├── .gitignore
├── gulp
│   ├── clean.js
│   ├── default.js
│   ├── images.js
│   ├── scripts.js
│   ├── server.js
│   ├── styles.js
│   └── watch.js
├── gulpfile.babel.js
├── migrator
├── package.json
├── README.md
├── sites
│   └── s1
│       ├── 404.php
│       ├── .access.php
│       ├── auth
│       ├── bitrix -> ../../core/bitrix
│       ├── index.php
│       ├── local -> ../../core/local
│       ├── .section.php
│       ├── upload -> ../../core/upload
│       └── urlrewrite.php
├── stage
│   └── servers_example.yml
└── .stylelintrc
```

## Необходимое ПО:
- [Git](https://git-scm.com/)
- [Composer](https://getcomposer.org/)
- [Deployer 4.3^](https://deployer.org/)
- [Node.js](https://nodejs.org/en/)
- [Arcanist](https://phacility.com/phabricator/arcanist/) (опционально)

## Быстрый старт:

На примере файловой структуры Bitrix Virtual Appliance

`/home/bitrix/` - домашняя директория пользователя
`/home/bitrix/www/` - директория с публичными файлами сайта

- Развернуть (если еще нет) на сервере Битрикс
- Клонировать репозиторий на сервер, например, в диеркторию `/home/bitrix/awesome-project/`
- Удалить из него директорию `.git`
- Выполнить `composer install`
- В перенести  upload, bitrix и local (при наличии) в директорию `~/awesome-project/core/`
- Остальные файлы перенести из `~/www/` в `~/awesome-project/sites/s1/`
- Создать симлинк `~/awesome-project/sites/s1 ->  ~/www`
- Инициализировать в директории проекта гит-репозиторий

## Релиз-менеджмент

В процессе работы над проектом необходимо иметь возможность оперативно доставлять
изменения на тестовое и продуктивное окружения, а также, при необходимости "откатывать"
неудачные релизы. За эту часть отвечает Deployer.
[Заметка раз](https://www.sitepoint.com/deploying-php-applications-with-deployer/),
[заметка два](https://habrahabr.ru/post/302442/).

Для работы с ним необходимо создать кофигурационный файл `stage/servers.yml`, пример заполнения файла
можно посмотерть в `stage/servers_example.yml`

Пояснения к примеру:

Сервер с идентфикатором `dev` - локальный, то есть тот, на котором ведется разработка,
его кофигурация необходима для Синхронизации данных (ниже)

`staging` - тестовый сервер. На него предполагается "разворачивать" релизы.

`production` - основной сервер

```shell
$ dep deploy staging
```

Команда создаст следующую структуру на удаленном сервере

```
├── current -> /path/to/deploy/releases/1
├── releases
│   └── 1
└── shared
    └── core
        ├── bitrix
        └── upload
```


## Синхронизация данных

Получить ядро (bitrix), ресурсы (upload) и базу c "дальнего" сайта:

```shell
$ dep sync dev --source-server staging --dest-path core
```

## Проверка кода на ошибки (Линтеры)

Если для управления разработкой используется платформа [Phabricator](https://phacility.com/phabricator/),
то при отправке кода на ревью с помощью консольной утилиты [Arcanist](https://phacility.com/phabricator/arcanist/),
Будет происходить его проверка на ошибки  в соответствии с конфигурационным файлом `.arclint`.
[Подробней о линте и линтерах](https://secure.phabricator.com/book/phabricator/article/arcanist_lint/)

## Фронтенд

Сборка фронтенда осуществляется с помощью npm-скриптов (которые являются алиасами для gulp-тасков).

Обрабатываются файлы в директориях  `core/loca/**/assets-raw`. Результаты сохраняются в "соседних" папках `core/loca/**/assets-done`.

```shell
$ npm run start    # запустить сборку в live-режиме
$ npm run build    # один раз собрать файлы
$ npm run styles   # сборка стилей
$ npm run images   # оптимизация изображений
$ npm run scripts  # сборка js-скриптов
$ npm run clean    # удалить результаты сборки
```

- JS собирается с помощью `browserify` и `babel`
- CSS обрабатывается `postCSS` плагинами:
  - nested
  - import
  - assets
  - sprites
  - autoprefixer
- изображения оптимизируются `gulp-imagemin`

Также доступна проверка js-кода линтером ESLint

```shell
$ npm run lint:scripts  # показать ошибки
$ npm run fix:scripts   # исправить ошибки
```


И проверка postcss-файлов утилитой Stylelint

```shell
$ npm run lint:styles  # показать ошибки
$ npm run fix:styles   # исправить ошибки
```

