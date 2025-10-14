# LeafSee Simple <!-- omit in toc -->

-   [Инструкция для установки и запуска проекта](#инструкция-для-установки-и-запуска-проекта)
    -   [Установка backend'а](#установка-backendа)
        -   [Через Poetry](#через-poetry)
        -   [Без Poetry](#без-poetry)
    -   [Установка frontend'а](#установка-frontendа)
        -   [Установка Node.js и npm](#установка-nodejs-и-npm)
            -   [Установка на Windows](#установка-на-windows)
            -   [Установка на GNU/Linux (на примере Ubuntu)](#установка-на-gnulinux-на-примере-ubuntu)
        -   [Установка Node.js библиотек](#установка-nodejs-библиотек)
    -   [Установка Docker контейнеров](#установка-docker-контейнеров)
    -   [Запуск проекта](#запуск-проекта)
        -   [Через Poetry](#через-poetry-1)
        -   [Через консоль](#через-консоль)
        -   [Через Visual Studio Code](#через-visual-studio-code)
-   [Работа с poetry](#работа-с-poetry)
    -   [Команды](#команды)
    -   [Пользовательские скрипты Poetry](#пользовательские-скрипты-poetry)
        -   [Реализованные скрипты Poetry](#реализованные-скрипты-poetry)
-   [Util Tools](#util-tools)
-   [Backend](#backend)
    -   [Django commands](#django-commands)
    -   [Django templatetags](#django-templatetags)
        -   [Реализация пользовательских templatetag'ов](#реализация-пользовательских-templatetagов)
    -   [Wrappers](#wrappers)
-   [Используемые pre-commit](#используемые-pre-commit)
-   [Фреймворки и библиотеки для HTML, CSS, JavaScript](#фреймворки-и-библиотеки-для-html-css-javascript)
    -   [Использование Tailwind](#использование-tailwind)
    -   [Использование Prettier](#использование-prettier)

# Инструкция для установки и запуска проекта

## Установка backend'а

### Через Poetry

1. Установить poetry в основное пространство

```console
pip install poetry
```

2. При необходимости, настроить poetry на размещение виртуального окружения в папке с проектом

```console
poetry config virtualenvs.in-project true
```

3. Создать виртуальное окружение через poetry и установить необходимые библиотеки

```console
poetry install
```

&ensp; &ensp; &ensp; &ensp; или, если нужны только библиотеки для запуска

```console
poetry install --only main
```

4. Разместить в `backend/.env` настройки backend'а по примеру из `backend/example.env`

5. Запустить скрипт для развёртывания backend'а

```console
poetry run init
```

&ensp; &ensp; &ensp; &ensp; или, если развертывание происходит на производственный сервер

```console
poetry run init --prod
```

### Без Poetry

1. Создать виртуальное окружение

```console
python -m venv .venv
```

2. Активировать виртуальное окружение

    1. Для Windows

        ```console
        .venv/Scripts/activate.bat
        ```

    2. Для GNU/Linux
        ```console
        source .venv/bin/activate
        ```

3. Установить библиотеки из `requirements.txt`

```console
pip install -r requirements.txt
```

4. Разместить в `backend/.env` настройки backend'а по примеру из `backend/example.env`

5. Запустить миграцию

```console
python backend/manage.py makemigrations
python backend/manage.py migrate
```

## Установка frontend'а

### Установка Node.js и npm

Сначала нужно установить менеджер пакетов `npm`, который идёт в комплекте с компилятором Node.js. Для этого лучше всего поставить `nvm` - менеджер версий Node.js.

#### Установка на Windows

Полная инструкция в репозитории `nvm-windows`: [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)

1. Перейти к релизам репозитория `nvm-windows`: [https://github.com/coreybutler/nvm-windows/releases/latest](https://github.com/coreybutler/nvm-windows/releases/latest)
2. Скачать архив `nvm-setup.zip`
3. Извлечь и запустить файл `nvm-setup.exe`
4. Следовать шагам мастера установки
5. Запустить терминал и ввести `nvm install lts`, будет установлена последняя LTS версия Node.js
6. После загрузки ввести `nvm use <version>`, где вместо `<version>` следует поставить версию Node.js, список скачанных версий можно увидеть с помощью команды `nvm list`

#### Установка на GNU/Linux (на примере Ubuntu)

Полная инструкция в репозитории `nvm`: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

1. Установить `curl`, если отсутствует
2. Запустить терминал
3. Ввести команду `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`
4. Ввести команду `source ~/.bashrc`
5. Ввести команду `nvm install --lts`, будет установлена последняя LTS версия Node.js
6. Ввести команду `nvm use <version>`, где вместо `<version>` следует поставить версию Node.js, список скачанных версий можно увидеть с помощью команды `nvm ls`

После установки `npm`, следует в терминале зайти в папку проекта и установить нужные библиотеки с помощью команды `npm install -DE` (библиотеки и их версии уже указаны в файле `package.json`)

### Установка Node.js библиотек

1. В корневой папке проекта установить Node пакеты для разработки

```console
npm install
```

2. В папке `frontend/` установить Node пакеты для разработки и запуска frontend'а

```console
cd frontend
npm install
```

&ensp; &ensp; &ensp; &ensp; или, если нужны только библиотеки для запуска

```console
cd frontend
npm install --production
```

## Установка Docker контейнеров

1. Установить Docker

    1. Для Windows - [https://docs.docker.com/desktop/setup/install/windows-install/](https://docs.docker.com/desktop/setup/install/windows-install/)
    2. Для Ubuntu
        1. Docker Engine - [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
        2. Docker compose
            ```console
            sudo apt install docker-compose
            ```

2. Запустить Docker контейнеры через `docker compose`

```console
docker compose -f docker_compose/leafsee_simple_dev/docker-compose.yml up -d
```

## Запуск проекта

### Через Poetry

1. Ввести в консоль

```console
poetry run s
```

2.  Открыть в браузере страницу [http://localhost:5435](http://localhost:5435)

### Через консоль

1. Зайти в папку `backend/` и запустить `gunicorn`

```console
gunicorn configs.wsgi:application --bind=0.0.0.0:8000 --reload
```

2. Зайти в папку `frontend/` и запустить `React`

```console
npm start
```

3. Открыть в браузере страницу [http://localhost:5435](http://localhost:5435)

### Через Visual Studio Code

1. Создать `launch.json` и вставить следующие настройки

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Django",
            "type": "debugpy",
            "request": "launch",
            "program": "${workspaceFolder}/backend/manage.py",
            "args": ["runserver"],
            "django": true,
            "autoStartBrowser": false
        },
        {
            "name": "Django: Gunicorn",
            "type": "debugpy",
            "request": "launch",
            "program": "${workspaceFolder}/.venv/bin/gunicorn",
            "gevent": true,
            "cwd": "${workspaceFolder}/backend",
            "args": [
                "configs.wsgi:application",
                "--bind=0.0.0.0:8000",
                "--reload"
            ]
        },
        {
            "name": "React",
            "command": "npm start",
            "cwd": "${workspaceFolder}/frontend",
            "request": "launch",
            "type": "node-terminal"
        },
        {
            "name": "Launch Chrome",
            "request": "launch",
            "type": "chrome",
            "url": "http://localhost:5435",
            "webRoot": "${workspaceFolder}",
            "runtimeArgs": [
                "--remote-debugging-port=9222",
                "--user-data-dir=${workspaceFolder}/.vscode/chromium"
            ],
            "port": 9222
        }
    ],
    "compounds": [
        {
            "name": "Django and React",
            "configurations": ["React", "Django: Gunicorn", "Launch Chrome"],
            "stopAll": true
        }
    ]
}
```

2. Во вкладке отладки выбрать вариант `Django and React` и запустить

# Работа с poetry

## Команды

Полный список команд для poetry: [https://python-poetry.org/docs/cli/](https://python-poetry.org/docs/cli/).

-   Чтобы установить библиотеку нужно в папке с проектом выполнить команду

```console
poetry add <название_библиотеки>
```

&ensp; &ensp; &ensp; &ensp; или, если библиотека нужна только для разработки

```console
poetry add -G dev <название_библиотеки>
```

&ensp; &ensp; &ensp; &ensp; poetry установит библиотеку в виртуальное окружение и сразу же добавит библиотеку в файл с зависимостями.

-   Чтобы выполнить команду(ы) через виртуальное окружение нужно

    -   либо выполнить команду

        ```console
        poetry run <команда> [<команда1>] [<команда2>] ...
        ```

    -   либо войти в виртуальное окружение и выполнять команды уже оттуда

        ```console
        poetry shell
        ```

## Пользовательские скрипты Poetry

Пользовательские скрипты прописываются в файле `pyproject.toml` в секции `[tool.poetry.scripts]`. Вызываются они так же, как и другие команды:

```console
poetry run <имя_скрипта>
```

Для добавления нового скрипта нужно

-   Написать функцию для скрипта в файле `util_tools/poetry/scripts.py`
-   Прописать путь до функции в файле `pyproject.toml` в секции `[tool.poetry.scripts]` по примеру ниже
    ```toml
    [tool.poetry.scripts]
    <имя_скрипта> = "util_tools.poetry.scripts:<название_функции>"
    ```

Для добавления скриптов из другого каталога нужно также прописать путь до их каталога в переменной `packages` в секции `[tool.poetry]`.

```toml
[tool.poetry]
packages = [{ include = "util_tools" }]
```

### Реализованные скрипты Poetry

-   `m` - сокращение для `python backend/manage.py`, принимает все аргументы и параметры подходящие для `manage.py`
-   `g` - сокращение для `gunicorn backend.configs.wsgi`, принимает все аргументы и параметры подходящие для `gunicorn`
-   `s` - запуск всего проекта, включая сервера Gunicorn и React
-   `t` - сокращение для `npx tailwindcss -i ...\input.css -o ...\out.css`, принимает все аргументы и параметры подходящие для `tailwindcss`
-   `full_migrate` - полная миграция Django (makemigrations и migrate)
-   `init` - начальное развертывание проекта
    -   `init --prod` - начальное развертывание проекта на рабочем сервере
-   `lint` - запуск локального линовщика (flake8)
-   `format` - запуск локального автоформатировщика для python кода (black)
-   `expreq` - экспорт зависимостей (только для запуска, не для разработки) в файл `requirements.txt` с соответствующем форматом

# Util Tools

В каталоге `util_tools` расположены различные скрипты, используемые в проекте.

Подкаталоги и файлы:

-   `poetry` - каталог со функциями пользовательских скриптов Poetry
    -   `scripts.py` - пользовательские скрипты для `poetry`
    -   `server_manager.py` - !!!

# Backend

## Django commands

Реализованные в проекте пользовательские Django commands'ы:

-   Приложение `authentication`
    -   `createuser` - позволяет интерактивно через терминал создать пользователя. Похож на `createsuperuser`, только создаёт пользователя без прав администратора

## Django templatetags

Каталог с пользовательскими templatetag'ами для Django.

-   `load_files` - файл с templatetag'ами для загрузки файлов при загрузке страниц

    -   `load_svg` - templatetag для загрузки SVG файлов.

        Атрибуты:

        1.  svg_path - путь до SVG файла относительно каталога `static`
        2.  \*\*kwargs - атрибуты для HTML тега svg

        Пример использования:

        ```HTML
        {% load_svg 'svg\leaf_icon.svg' class='w-7 float-left' %}
        ```

### Реализация пользовательских templatetag'ов

Полная документация по пользовательским templatetag'ам: [https://docs.djangoproject.com/en/5.0/howto/custom-template-tags/](https://docs.djangoproject.com/en/5.0/howto/custom-template-tags/).

Чтобы использовать собственные templatetag'и нужно (ниже пример для файла с названием `example.py`):

1. В каталоге `backend/templatetags` создать файл и прописать в него скрипт

    ```python
    # example.py

    from django import template

    register = template.Library()

    @register.simple_tag(name="example_tag")
    def example_fun(arg1, arg2, **kwargs):
        # Do what you want
        return "string"
    ```

2. Добавить файл `example.py` в `settings.py`

    ```python
    # settings.py

    TEMPLATES = [
        {
            ...
            "OPTIONS": {
                ...
                "libraries": {
                    "example": "backend.templatetags.example",
                },
            },
        },
    ]
    ```

3. Загрузить templatetag'и из файла на HTML страницу

    ```HTML
    {% load example %}
    ```

4. Прописать нужный templatetag
    ```HTML
    {% example_tag 'arg1' 2 width=8 class='w-8' %}
    ```

## Wrappers

Каталог с обёртками для python классов и функций

-   `model_wrappers` - обёртки для моделей Django

    -   `extend_choices` - обёртка для расширения переменных класса типа `Choices` за счёт другого класса такого же типа

        Пример использования:

        ```python
        from util_tools.wrappers.model_wrappers import extend_choices

        class First(models.TextChoices):
            FIRST = "1"

        @extend_choices(First)
        class Second(models.TextChoices):
            SECOND = "2"
        ```

        ```bash
        >>> Second.SECOND
        2
        >>> Second.FIRST
        1
        ```

# Используемые pre-commit

Запускаются перед созданием коммита в `git`.

-   `poetry-check` - проверяет на корректность структуру файла `pyproject.toml` (только для тех изменений, которые добавлены в коммит)
-   `poetry-lock` - обновляет файл `poetry.lock` с зависимостями и подзависимостями проекта, без обновления их версий (только для тех изменений `pyproject.toml`, которые добавлены в коммит)
-   `poetry-export` - экспорт зависимостей (только для запуска, не для разработки) в файл `requirements.txt` с соответствующем форматом (только для тех изменений `pyproject.toml`, которые добавлены в коммит)
-   `black` - применение автоформатировщика `black` к Python файлам backend'а
-   `flake8` - применение линтера `flake8` к файлам проекта
-   `prettier` - применение автоформатировщика Prettier к HTML, CSS, JS и прочим файлам проекта
-   `lint-staged` - применение автоформатировщика `black` к файлам frontend'а

# Фреймворки и библиотеки для HTML, CSS, JavaScript

В проекте для web страниц используются следующие Фреймворки и библиотеки:

-   [Tailwind CSS](https://tailwindcss.com/) - фреймворк для генерации CSS стилей на основе указанных классов
-   [Prettier](https://prettier.io/) - автоформатировщик кода для HTML, CSS и JS

## Использование Tailwind

Полная документация: [https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)

Файлы, которые отслеживает Tailwind, указываются в атрибуте `content` файла `tailwind.config.js` в корне проекта.

Чтобы обновить CSS через Tailwind нужно в терминале прописать `poetry run t`. Можно добавить атрибут `--watch` чтобы обновлять постоянно при изменении отслеживаемых файлов.

## Использование Prettier

Полная документация: [https://prettier.io/docs/en/](https://prettier.io/docs/en/)

Конфигурация Prettier указывается в файле `.prettierrc.json` в корне проекта. Файлы, которые игнорирует Prettier - в файле `.prettierignore` (формат как в `.gitignore`).

Чтобы запустить автоформатирование нужно в терминале прописать `npx prettier <path/to/file> --write`, где `<path/to/file>` - путь до файла, который нужно форматировать, либо `.`, если нужно форматировать все файлы в проекте. Также для VS Code можно установить плагин для Prettier.

Так как Prettier не умеет правильно форматировать шаблоны Django в HTML коде, то может потребоваться поставить перед ними комментарий `<!-- prettier-ignore -->` и форматировать в ручную.
