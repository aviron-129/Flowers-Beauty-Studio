import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pub = (...parts) => encodeURI(`/цветы/${parts.join("/")}`);

const catalog = "каталог букетов";
const popular = "популярные букеты";

const m = {
  roses: {
    r1: pub(catalog, "Розы", "images.jpg"),
    r2: pub(catalog, "Розы", "images (1).jpg"),
    r3: pub(catalog, "Розы", "images (2).jpg"),
    cover: pub(catalog, "Розы", "images (5).jpg"),
  },
  peonies: {
    p1: pub(catalog, "пионы", "Без названия.jpg"),
    cover: pub(catalog, "пионы", "Без названия (3).jpg"),
  },
  tulips: {
    t2: pub(catalog, "тюльпаны", "Без названия (1).jpg"),
    cover: pub(catalog, "тюльпаны", "Без названия (2).jpg"),
  },
  hydrangea: {
    h1: pub(catalog, "гортензии", "images.jpg"),
    cover: pub(catalog, "гортензии", "Без названия (2).jpg"),
  },
  wedding: {
    w1: pub(catalog, "свадебные", "images.jpg"),
    w2: pub(catalog, "свадебные", "Без названия (1).jpg"),
    cover: pub(catalog, "свадебные", "Без названия (3).jpg"),
  },
  gifts: {
    g1: pub(catalog, "подарки", "images.jpg"),
    g2: pub(catalog, "подарки", "Без названия.jpg"),
    cover: pub(catalog, "подарки", "images (2).jpg"),
  },
  seasonal: {
    s1: pub(catalog, "сезонные", "Без названия (1).jpg"),
    s2: pub(catalog, "сезонные", "Без названия (2).jpg"),
    cover: pub(catalog, "сезонные", "Без названия (4).jpg"),
  },
  popular: {
    p1: pub(popular, "buket-b3a_5.jpg"),
  },
};

const categoryImages = {
  Розы: m.roses.cover,
  Пионы: m.peonies.cover,
  Тюльпаны: m.tulips.cover,
  Гортензии: m.hydrangea.cover,
  Свадебные: m.wedding.cover,
  Подарки: m.gifts.cover,
  Сезонные: m.seasonal.cover,
};

const productImages = {
  "Нежность утра": m.roses.r1,
  "Классика любви": m.roses.r2,
  "Облако пионов": m.peonies.p1,
  "Свадебная нежность": m.wedding.w1,
  "Весенний свет": m.tulips.t2,
  "Голубая мечта": m.hydrangea.h1,
  "Подарок в коробке": m.gifts.g1,
  "Солнечный акцент": m.seasonal.s1,
  "Романтика вечера": m.roses.r3,
  "Белая свадьба": m.wedding.w2,
  "Летний бриз": m.seasonal.s2,
  "Sweet Box": m.gifts.g2,
};

async function main() {
  for (const [title, imageUrl] of Object.entries(categoryImages)) {
    const result = await prisma.category.updateMany({
      where: { title },
      data: { imageUrl },
    });
    console.log(`Category "${title}": ${result.count} updated`);
  }

  for (const [title, imageUrl] of Object.entries(productImages)) {
    const result = await prisma.product.updateMany({
      where: { title },
      data: { imageUrl },
    });
    console.log(`Product "${title}": ${result.count} updated`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
