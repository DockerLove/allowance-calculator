# Расчёт припусков на механическую обработку
Веб-приложение для расчёта межоперационных припусков на механическую обработку методом минимальных припусков (метод В.М. Кована).

## Стек
- React + TypeScript
- Material UI (MUI)
- Yarn- Docker / Docker Compose

## Запуск в режиме разработки
- yarn install

- yarn start

Приложение откроется на http://localhost:3000

## Запуск через Docker Compose
docker-compose up -d --build

Приложение будет доступно на http://localhost:3000

## Остановка контейнера
docker-compose down

## Структура проекта

- `src/Components` — компоненты интерфейса (Header, Content, Card, блоки параметров)
- `src/Dictionaries` — справочные данные (виды заготовок, переходы обработки)
- `src/Types` — TypeScript-интерфейсы и перечисления
- `src/utils` — логика расчёта припусков
