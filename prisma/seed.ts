import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const pub = (...parts: string[]) => encodeURI(`/цветы/${parts.join("/")}`);

const catalog = "каталог букетов";

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
};

async function main() {
  console.log("Seeding database...");

  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();
  await prisma.siteSettings.deleteMany();

  const passwordHash = await bcrypt.hash("admin123456", 12);

  await prisma.adminUser.create({
    data: {
      email: "admin@example.com",
      passwordHash,
      name: "Администратор",
    },
  });

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        title: "Розы",
        description: "Классика и пионовидные сорта",
        imageUrl: m.roses.cover,
        sortOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        title: "Пионы",
        description: "Сезонные букеты и композиции",
        imageUrl: m.peonies.cover,
        sortOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        title: "Тюльпаны",
        description: "Яркие весенние букеты",
        imageUrl: m.tulips.cover,
        sortOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        title: "Гортензии",
        description: "Объёмные монобукеты",
        imageUrl: m.hydrangea.cover,
        sortOrder: 4,
      },
    }),
    prisma.category.create({
      data: {
        title: "Свадебные",
        description: "Букеты невесты и декор",
        imageUrl: m.wedding.cover,
        sortOrder: 5,
      },
    }),
    prisma.category.create({
      data: {
        title: "Подарки",
        description: "Композиции в коробках",
        imageUrl: m.gifts.cover,
        sortOrder: 6,
      },
    }),
    prisma.category.create({
      data: {
        title: "Сезонные",
        description: "Актуальные сезонные букеты",
        imageUrl: m.seasonal.cover,
        sortOrder: 7,
      },
    }),
  ]);

  const [roses, peonies, tulips, hydrangea, wedding, gifts, seasonal] = categories;

  const products = [
    {
      title: "Нежность утра",
      description: "Пионовидные розы, эвкалипт, атласная лента",
      price: 4900,
      imageUrl: m.roses.r1,
      categoryId: roses.id,
      isPopular: true,
      sortOrder: 1,
    },
    {
      title: "Красно-белая классика",
      description: "Красные и белые розы, красная атласная лента",
      price: 8500,
      oldPrice: 9900,
      imageUrl: m.roses.r2,
      categoryId: roses.id,
      isPopular: true,
      sortOrder: 2,
    },
    {
      title: "Облако пионов",
      description: "Розовые пионы, матовая упаковка",
      price: 9800,
      imageUrl: m.peonies.p1,
      categoryId: peonies.id,
      isPopular: true,
      sortOrder: 3,
    },
    {
      title: "Свадебная нежность",
      description: "Белые розы, ранункулюсы, кружевная лента",
      price: 12500,
      imageUrl: m.wedding.w1,
      categoryId: wedding.id,
      sortOrder: 4,
    },
    {
      title: "Красные тюльпаны",
      description: "Красные тюльпаны, craft-упаковка",
      price: 6200,
      imageUrl: m.tulips.t2,
      categoryId: tulips.id,
      sortOrder: 5,
    },
    {
      title: "Розовое облако",
      description: "Розовые гортензии, матовая упаковка",
      price: 7200,
      imageUrl: m.hydrangea.h1,
      categoryId: hydrangea.id,
      sortOrder: 6,
    },
    {
      title: "Фруктовый букет",
      description: "Яблоки, клубника, виноград, craft-упаковка",
      price: 5900,
      imageUrl: m.gifts.g1,
      categoryId: gifts.id,
      sortOrder: 7,
    },
    {
      title: "Нежные лилии",
      description: "Розовые лилии, статица, craft-упаковка",
      price: 4500,
      imageUrl: m.seasonal.s1,
      categoryId: seasonal.id,
      isPopular: true,
      sortOrder: 8,
    },
    {
      title: "Белоснежные розы",
      description: "Белые розы премиум, craft-упаковка",
      price: 7800,
      imageUrl: m.roses.r3,
      categoryId: roses.id,
      sortOrder: 9,
    },
    {
      title: "Белая свадьба",
      description: "Белые розы, хлопок, кружевная лента",
      price: 14500,
      imageUrl: m.wedding.w2,
      categoryId: wedding.id,
      isPopular: true,
      sortOrder: 10,
    },
    {
      title: "Нежное лето",
      description: "Пионы, дельфиниум, craft-упаковка",
      price: 4200,
      imageUrl: m.seasonal.s2,
      categoryId: seasonal.id,
      sortOrder: 11,
    },
    {
      title: "Букет для него",
      description: "Колбаса, сыр, лимон, Coca-Cola",
      price: 5500,
      imageUrl: m.gifts.g2,
      categoryId: gifts.id,
      sortOrder: 12,
    },
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  await prisma.siteSettings.create({
    data: {
      id: 1,
      siteName: "Цветочная студия «Верба»",
      heroTitle: "Цветы, которые запоминаются",
      heroText:
        "Собираем букеты вручную из свежих цветов премиального качества. Доставим точно в срок — с открыткой и вашим посланием.",
      phone: "+74951234567",
      address: "ул. Арбат, 12, Москва",
      whatsapp: "https://wa.me/74951234567",
      telegram: "https://t.me/verba_flowers",
      instagram: "https://instagram.com/verba_flowers",
    },
  });

  console.log("Seed completed:");
  console.log("  Admin: admin@example.com / admin123456");
  console.log(`  Categories: ${categories.length}`);
  console.log(`  Products: ${products.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
