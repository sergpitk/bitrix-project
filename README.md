# bitrix-project-stub
Заготовка для новых проектов на Битрикс

## Из чего состоит:

```
.
├── .arclint                # Файл-конфиг линтеров
├── composer.json           # Внешние пхп-пакеты проекта, конфиг автозагрузчика классов
├── composer.lock           #  
├── core                    # Директория для файлов ядра (bitrix) и ресурсных файлов (upload)
│   └── local               # Основная директория для самописных шаблонов/компонентов/классов
├── deploy.php              # Конфигурация и команды утилиты deployer
├── .eslintrc               # Конфиг линтера js-файлов
├── .gitignore              # 
├── migrator                # CLI-утилита для создания и применения миграций БД
├── prebuild                # Заготовка для системы сборки gulp/webpack
│   └── .gitkeep            #
├── README.md               # Описание проекта 
├── shared                  # Директория для шаблонов конфигурационных файлов
│   └── sites               # 
├── sites                   # Директория для хранения "сайтов"
│   └── s1                  # Статичные файлы сайта и симлинки на служебные директории битрикс
├── stage                   # 
│   └── servers_example.yml # Пример файла конфигурации окружений для deployer
└── .stylintrc              # Конфиг линтера styl-файлов
```

## Необходимое ПО:
- [Git](https://git-scm.com/)
- [Composer](https://getcomposer.org/)
- [Deployer](https://deployer.org/) (Устанавливается локально как зависимость composer)
- [Arcanist](https://phacility.com/phabricator/arcanist/) (опционально)
- [PHPCS](https://github.com/squizlabs/PHP_CodeSniffer) (опционально)
- [ESlint](http://eslint.org/) (опционально)

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

```
$ ./vendor/bin/dep deploy staging
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

```
$ ./vendor/bin/dep sync dev --source-server staging --dest-path core
```

Сгенерировать файлы конфигурации из шаблонов для работы сайта

```
$ ./vendor/bin/dep deploy:configure
```

## Проверка кода на ошибки (Линтеры)

Если для управления разработкой используется платформа [Phabricator](https://phacility.com/phabricator/),
то при отправке кода на ревью с помощью консольной утилиты [Arcanist](https://phacility.com/phabricator/arcanist/),
Будет происходить его проверка на ошибки  в соответствии с конфигурационным файлом `.arclint`.
[Подробней о линте и линтерах](https://secure.phabricator.com/book/phabricator/article/arcanist_lint/)