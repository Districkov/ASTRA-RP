# ASTRA-RP — сайт проекта

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=flat-square&logo=react-router&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=flat-square&logo=eslint&logoColor=white)

Клиентское SPA на **React 19 + TypeScript + Vite**: главная страница проекта,
поддержка проекта (донаты), юридические документы и интеграция платежей.

🔗 **Демо:** https://astra-rp.vercel.app

## ✨ Возможности

- 🏠 **Главная страница** проекта с блоками презентации
- 💳 **Страница поддержки проекта** с интеграцией платежей
- 📄 **Юридические документы** отдельными маршрутами: оферта, политика конфиденциальности, условия использования
- 🧭 **Клиентская маршрутизация** через React Router без перезагрузок
- 🎨 **Иконки** lucide-react и собственные стили
- ⚡ **Сборка на Vite 7** с включённым **React Compiler**
- 🌍 **Деплой на Vercel**

## 🛠 Стек

| Слой | Технологии |
|------|-----------|
| UI | React 19, React DOM 19 |
| Язык | TypeScript 5.9 |
| Маршрутизация | react-router-dom 6 |
| Сборка | Vite 7, `@vitejs/plugin-react`, **React Compiler** |
| Иконки | lucide-react |
| Стили | CSS |
| Качество | ESLint 9, typescript-eslint |

## 📁 Структура проекта

```
ASTRA-RP/
├── public/                       # статика
├── src/
│   ├── assets/                   # изображения и ресурсы
│   ├── config/                   # конфигурация приложения
│   ├── pages/                    # страницы-маршруты
│   │   ├── HomePage.tsx          # главная
│   │   ├── DonatePage.tsx        # поддержка проекта
│   │   ├── OfferAgreement.tsx    # публичная оферта
│   │   ├── PrivacyPolicy.tsx     # политика конфиденциальности
│   │   └── TermsOfService.tsx    # условия использования
│   ├── services/
│   │   └── paymentService.ts     # работа с платежами
│   ├── styles/                   # стили
│   ├── App.tsx                   # корневой компонент и роутинг
│   ├── main.tsx                  # точка входа
│   ├── App.css
│   └── index.css
├── index.html
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── eslint.config.js
├── DOCUMENTATION.md              # документация проекта
├── QUICKSTART.md                 # быстрый старт
└── SUMMARY.md                    # краткое описание
```

## 📜 Скрипты

| Команда | Что делает |
|---------|-----------|
| `npm run dev` | Dev-сервер Vite с HMR |
| `npm run build` | Проверка типов (`tsc -b`) + прод-сборка |
| `npm run preview` | Локальный предпросмотр собранной версии |
| `npm run lint` | Проверка ESLint |

## 🚀 Запуск

```bash
npm install
npm run dev       # http://localhost:5173
```

Прод-сборка:

```bash
npm run build
npm run preview
```

## 🧠 Что демонстрирует проект

- **Современный стек React:** React 19 + React Compiler — автоматическая мемоизация без ручных `useMemo`
- **Клиентская маршрутизация** с отдельными страницами и юридическими документами
- **Слой сервисов** (`services/`) — обращения к платежному API вынесены из компонентов
- **Разделение конфигурации:** настройки приложения в `src/config/`
- **Строгая типизация** и проверка типов в CI-шаге сборки (`tsc -b` перед `vite build`)

## 👤 Автор

Иван Соломин — [github.com/Districkov](https://github.com/Districkov)
