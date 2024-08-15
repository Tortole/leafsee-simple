# LeafSee Simple

## Инструкция для установки проекта

1. Установить poetry в основное пространство:

```console
pip install poetry
```

2. При необходимости, настроить poetry на размещение виртуального окружения в папке с проектом:

```console
poetry config virtualenvs.in-project true
```

3. Создать виртуальное окружение через poetry и установить необходимые библиотеки:

```console
poetry install
```

&ensp; &ensp; &ensp; &ensp; или, если нужны только библиотеки для запуска:

```console
poetry install --only main
```

4. Разместить в `leafsee_simple/.env` настройки проекта по примеру из `leafsee_simple/example.env`

5. Запустить скрипт для развёртывания проекта:

```console
poetry run init
```

&ensp; &ensp; &ensp; &ensp; или, если развертывание происходит на производственный сервер:

```console
poetry run init --prod
```

6. Запустить локальный сервер django с проектом через команду

```console
poetry run m runserver
```

## Работа с poetry

Полный список команд для poetry: [https://python-poetry.org/docs/cli/](https://python-poetry.org/docs/cli/).

Чтобы установить библиотеку нужно в папке с проектом выполнить команду:

```console
poetry add <lib_name>
```

или, если библиотека нужна только для разработки:

```console
poetry add -G dev <lib_name>
```

poetry установит библиотеку в виртуальное окружение и сразу же добавит библиотеку в файл с зависимостями.

Чтобы выполнить команду(ы) через виртуальное окружение нужно:

-   либо выполнить команду:

```console
poetry run <command> [<command1>] [<command2>] ...
```

-   либо войти в виртуальное окружение и выполнять команды уже оттуда:

```console
poetry shell
```

Пользовательские скрипты прописываются в файле `util_tools/scripts.py`. Для прямого вызова через poetry их нужно прописать в файле `pyproject.toml` в секции `[tool.poetry.scripts]` и их директорию в переменной `packages` в секции `[tool.poetry]`. Вызываются они так же, как и другие команды:

```console
poetry run <scripts_name>
```

### Реализованные скрипты Poetry

-   `m` - сокращение для `python manage.py`, принимает все аргументы и параметры подходящие для `manage.py`
-   `t` - сокращение для `npx tailwindcss -i ...\input.css -o ...\out.css`, принимает все аргументы и параметры подходящие для `tailwindcss`
-   `full_migrate` - полная миграция Django (makemigrations и migrate)
-   `init` - начальное развертывание проекта
    -   `init --prod` - начальное развертывание проекта на рабочем сервере
-   `lint` - запуск локального линовщика (flake8)
-   `format` - запуск локального автоформатировщика для python кода (black)
-   `expreq` - экспорт зависимостей (только для запуска, не для разработки) в файл `requirements.txt` с соответствующем форматом

## Util Tools

В каталоге `util_tools` расположены различные скрипты, используемые в проекте.

Подкаталоги и файлы со скриптами:

-   `scripts.py` - пользовательские скрипты для `poetry`

-   `templatetags` - каталог с пользовательскими template tag'ами для Django

    -   `load_files` - файл с template tag'ами для загрузки файлов при загрузке страниц

        -   `load_svg` - template tag для загрузки SVG файлов.

            Атрибуты:

            1. svg_path - путь до SVG файла относительно директории `static`
            2. \*\*kwargs - атрибуты для HTML тега svg

            Пример использования:

            ```HTML
            {% load_svg 'svg\leaf_icon.svg' class='w-7 float-left' %}
            ```

-   `wrappers` - обёртки для python классов и функций

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

### Реализация пользовательских template tag'ов

Полная документация по пользовательским template tag'ам: [https://docs.djangoproject.com/en/5.0/howto/custom-template-tags/](https://docs.djangoproject.com/en/5.0/howto/custom-template-tags/).

Чтобы использовать собственные template tag'и нужно:

1. В директории `util_tools/templatetags` создать файл и прописать в него скрипт (пример для файла с названием `example.py`):

    ```python
    # example.py

    from django import template

    register = template.Library()

    @register.simple_tag(name="example_tag")
    def example_fun(arg1, arg2, **kwargs):
        # Do what you want
        return "string"
    ```

2. Добавить файл `example.py` в `settings.py`:

    ```python
    # settings.py

    TEMPLATES = [
        {
            ...
            "OPTIONS": {
                ...
                "libraries": {
                    "example": "util_tools.templatetags.example",
                },
            },
        },
    ]
    ```

3. Загрузить template tag'и из файла на HTML страницу:
    ```HTML
    {% load example %}
    ```
4. Прописать нужный template tag:
    ```HTML
    {% example_tag 'arg1' 2 width=8 class='w-8' %}
    ```

## Django management

### Django commands

Реализованные в проекте пользовательские Django commands'ы:

1. Приложение `authentication`
    1. `createuser` - позволяет интерактивно через терминал создать пользователя. Похож на `createsuperuser`, только создаёт пользователя без прав администратора

## Используемые pre-commit

Запускаются перед созданием коммита в `git`.

-   `prettier` - применение автоформатировщика Prettier к HTML, CSS, JS и прочим файлам проекта
-   `poetry-check` - проверяет на корректность структуру файла `pyproject.toml` (только для тех изменений, которые добавлены в коммит)
-   `poetry-lock` - обновляет файл `poetry.lock` с зависимостями и подзависимостями проекта, без обновления их версий (только для тех изменений `pyproject.toml`, которые добавлены в коммит)
-   `poetry-export` - экспорт зависимостей (только для запуска, не для разработки) в файл `requirements.txt` с соответствующем форматом (только для тех изменений `pyproject.toml`, которые добавлены в коммит)
-   `black` - применение автоформатировщика `black` к Python файлам проекта
-   `flake8` - применение линтера `flake8` к файлам проекта

## Фреймворки и библиотеки для HTML, CSS, JavaScript

В проекте для web страниц используются следующие Фреймворки и библиотеки:

-   [Tailwind CSS](https://tailwindcss.com/) - фреймворк для генерации CSS стилей на основе указанных классов
-   [Prettier](https://prettier.io/) - автоформатировщик кода для HTML, CSS и JS

### Установка

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

### Использование Tailwind

Полная документация: [https://tailwindcss.com/docs/installation](https://tailwindcss.com/docs/installation)

Файлы, которые отслеживает Tailwind, указываются в атрибуте `content` файла `tailwind.config.js` в корне проекта.

Чтобы обновить CSS через Tailwind нужно в терминале прописать `poetry run t`. Можно добавить атрибут `--watch` чтобы обновлять постоянно при изменении отслеживаемых файлов.

### Использование Prettier

Полная документация: [https://prettier.io/docs/en/](https://prettier.io/docs/en/)

Конфигурация Prettier указывается в файле `.prettierrc.json` в корне проекта. Файлы, которые игнорирует Prettier - в файле `.prettierignore` (формат как в `.gitignore`).

Чтобы запустить автоформатирование нужно в терминале прописать `npx prettier <path/to/file> --write`, где `<path/to/file>` - путь до файла, который нужно форматировать, либо `.`, если нужно форматировать все файлы в проекте. Также для VS Code можно установить плагин для Prettier.

Так как Prettier не умеет правильно форматировать шаблоны Django в HTML коде, то может потребоваться поставить перед ними комментарий `<!-- prettier-ignore -->` и форматировать в ручную.
