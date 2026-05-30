import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/** sortOrder → новые название и описание (по реальным фото) */
const updates = [
  {
    sortOrder: 1,
    title: "Нежность утра",
    description: "Пионовидные розы, эвкалипт, атласная лента",
  },
  {
    sortOrder: 2,
    title: "Красно-белая классика",
    description: "Красные и белые розы, красная атласная лента",
  },
  {
    sortOrder: 3,
    title: "Облако пионов",
    description: "Розовые пионы, матовая упаковка",
  },
  {
    sortOrder: 4,
    title: "Свадебная нежность",
    description: "Белые розы, ранункулюсы, кружевная лента",
  },
  {
    sortOrder: 5,
    title: "Красные тюльпаны",
    description: "Красные тюльпаны, craft-упаковка",
    categoryTitle: "Тюльпаны",
  },
  {
    sortOrder: 6,
    title: "Розовое облако",
    description: "Розовые гортензии, матовая упаковка",
  },
  {
    sortOrder: 7,
    title: "Фруктовый букет",
    description: "Яблоки, клубника, виноград, craft-упаковка",
  },
  {
    sortOrder: 8,
    title: "Нежные лилии",
    description: "Розовые лилии, статица, craft-упаковка",
  },
  {
    sortOrder: 9,
    title: "Белоснежные розы",
    description: "Белые розы премиум, craft-упаковка",
  },
  {
    sortOrder: 10,
    title: "Белая свадьба",
    description: "Белые розы, хлопок, кружевная лента",
  },
  {
    sortOrder: 11,
    title: "Нежное лето",
    description: "Пионы, дельфиниум, craft-упаковка",
  },
  {
    sortOrder: 12,
    title: "Букет для него",
    description: "Колбаса, сыр, лимон, Coca-Cola",
  },
];

async function main() {
  const categories = await prisma.category.findMany();
  const byTitle = Object.fromEntries(categories.map((c) => [c.title, c.id]));

  for (const u of updates) {
    const data = {
      title: u.title,
      description: u.description,
      ...(u.categoryTitle && byTitle[u.categoryTitle]
        ? { categoryId: byTitle[u.categoryTitle] }
        : {}),
    };
    const result = await prisma.product.updateMany({
      where: { sortOrder: u.sortOrder },
      data,
    });
    console.log(`#${u.sortOrder} "${u.title}": ${result.count} updated`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
