# Тестовое задания SGMK

Приложение состоит из `backend` (развернут на [NestJS](https://docs.nestjs.com/) версия cli `10.0.0`) и `frontend` (развернут на [NuxtJS](https://nuxt.com/docs/getting-started/installation) версия `3.11.1`). 

## Запуск с помощью docker compose

 1. В директориях `backend` и `frontend` создаем файлы `.env` с переменными из `.env.example` и подставляем свои значения.
 2. Запуск сборки:

```bash
$ docker compose up -d --build
```

`backend` доступен по умолчанию на `7777` порту, изменить можно в `docker-compose.yml`.

или:

## Backend

### Подготовка к запуску приложения

В директории `backend` создаем файл `.env` с переменными из `.env.example` и подставляем свои значения.

### Скрипты для запуска

Из корневой директории:

```bash
# Установка зависимостей
$ yarn install:backend

# Запуск в режиме разработки
$ yarn dev:backend
```

## Frontend

### Подготовка к запуску приложения

В директории `frontend` создаем файл `.env` с переменными из `.env.example` и подставляем свои значения.

### Скрипты для запуска

Из корневой директории:

```bash
# Установка зависимостей
$ yarn install:frontend

# Запуск в режиме разработки
$ yarn dev
```

