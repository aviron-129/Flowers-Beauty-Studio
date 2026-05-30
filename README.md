# Florist Landing — Цветочная студия «Верба»

Одностраничный лендинг для флориста / цветочного магазина (Москва, ₽).

## Стек

- Next.js 15 / React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- shadcn/ui (минимальный набор компонентов)

## Запуск

```bash
npm install
cp .env.example .env   # или создайте .env вручную
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Админка

URL: [http://localhost:3000/admin](http://localhost:3000/admin)

**Демо-логин:**
- Email: `admin@example.com`
- Password: `admin123456`

### Команды базы данных

| Команда | Описание |
|---------|----------|
| `npm run db:generate` | Генерация Prisma Client |
| `npm run db:push` | Применить схему к SQLite |
| `npm run db:seed` | Заполнить демо-данными |
| `npm run db:studio` | Prisma Studio (просмотр БД) |

База: `prisma/dev.db` (SQLite). Структура легко переносится на PostgreSQL — смените `provider` в `prisma/schema.prisma`.

### Что можно в админке

- **Товары** — добавить / редактировать / удалить букеты, цены, фото (`imageUrl`)
- **Категории** — управление категориями витрины
- **Заявки** — заявки с формы заказа, смена статуса
- **Настройки** — название, hero, телефон, адрес, мессенджеры

Фото указываются текстом: `/media/florist/images/catalog-01.jpg`

## Настройка под клиента

Весь контент — в `src/data/siteConfig.ts`:
- название, описание, услуги, цены
- букеты, категории, отзывы, FAQ
- контакты, соцсети, форма заказа
- пути к изображениям и видео

## Медиа

- `public/media/florist/images/` — 33 фото (Pexels / Unsplash, royalty-free)
- `public/media/florist/video/florist-making-bouquet.mp4` — видео процесса сборки букета (Pexels)

## Структура блоков

Hero → Преимущества → Букеты → Категории → Услуги → Цены → Галерея → О нас → Для кого → Этапы заказа → Доставка → Акция → Отзывы → FAQ → Форма заказа → Контакты → Footer + Floating CTA

Блоки можно менять местами в `src/app/page.tsx`.
