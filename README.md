# bitrix-project-stub
Заготовка для новых проектов на Битрикс

*В процессе разработки*

Требования:

- Node
- Gulp
- Composer
- Deployer

Для начала работы следует
- создать кофигурационные файлы,
- установить зависимости npm
- слинковать dist-директорию с директорией веб-сервера (н-р dist/s1 -> /var/www/public_html)

Состоит из трех частей:

0) Непосредственно базовый битрикс-шаблон и некая структура проекта
1) Система сборки/валидации/оптимизации фронтенда с помощью gulp
2) Сценарии деплоя для утилиты deployer


## Gulp-таски
- `default` - запустить сборку, сервер и  вотчер файлов
- `build` - разово запустить сборку, положить результат работы в  папку `dist`
- `clean` - удалить папку `dist`
- `images` - оптимизация изображений с помощью `imagemin`
- `php` - копипаст *.php файлов из src в dist
- `scripts` - сборка js-бандлов с использованием browserify
- `server` - поднять прокси-сервер browsersync
- `styles` - сборка файлов стилей
- `watch` - отслеживание изменений в файлах и запуск соответствующих файлам тасков

Планы:
- [] Добавить линтер файлов стилей
- [] Добавить линтер js-скриптов

## [Deployer](http://deployer.org)

Как Capistrano, только на php

Специфичные задачи:
 - дублировать базу "родительского сайта"
 - дублировать файлы "родительского сайта"
 - сгенерировать настройки битрикса


Источники:

- https://habrahabr.ru/post/250569/
- https://github.com/CSSSR/csssr-project-template
- http://fettblog.eu/gulp-browserify-multiple-bundles/
- http://www.sitepoint.com/getting-started-browserify/