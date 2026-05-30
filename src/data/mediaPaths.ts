/** Пути к медиа в public/цветы — encodeURI для кириллицы и пробелов */
export const pub = (...parts: string[]) => encodeURI(`/цветы/${parts.join("/")}`);

const catalog = "каталог букетов";
const popular = "популярные букеты";
const gallery = "галерия работ";
const services = "Услуги флориста";

export const mediaPaths = {
  hero: pub("задний фон", "images.jpg"),
  heroVideo: "/media/florist/video/florist-making-bouquet.mp4",
  about: pub(gallery, "6067648a12140ed55b935b4b4d227c88.jpg"),
  delivery: pub(catalog, "тюльпаны", "Без названия (5).jpg"),
  promo: pub(popular, "buket-b3a_5.jpg"),

  popular: {
    p1: pub(popular, "buket-b3a_5.jpg"),
    p2: pub(popular, "images.jpg"),
    p3: pub(popular, "98965405.jpg"),
    p4: pub(popular, "9-svetlo-rozovyh-pion-.webp"),
    p5: pub(popular, "1b87a79f-8952-422a-a05b-34149050563d.jpeg"),
    p6: pub(popular, "images (1).jpg"),
  },

  roses: {
    r1: pub(catalog, "Розы", "images.jpg"),
    r2: pub(catalog, "Розы", "images (1).jpg"),
    r3: pub(catalog, "Розы", "images (2).jpg"),
    r4: pub(catalog, "Розы", "images (3).jpg"),
    r5: pub(catalog, "Розы", "images (4).jpg"),
    r6: pub(catalog, "Розы", "Без названия.jpg"),
    cover: pub(catalog, "Розы", "images (5).jpg"),
  },

  peonies: {
    p1: pub(catalog, "пионы", "Без названия.jpg"),
    p2: pub(catalog, "пионы", "Без названия (1).jpg"),
    p3: pub(catalog, "пионы", "Без названия (2).jpg"),
    cover: pub(catalog, "пионы", "Без названия (3).jpg"),
  },

  tulips: {
    t1: pub(catalog, "тюльпаны", "Без названия.jpg"),
    t2: pub(catalog, "тюльпаны", "Без названия (1).jpg"),
    cover: pub(catalog, "тюльпаны", "Без названия (2).jpg"),
  },

  hydrangea: {
    h1: pub(catalog, "гортензии", "images.jpg"),
    h2: pub(catalog, "гортензии", "Без названия (1).jpg"),
    cover: pub(catalog, "гортензии", "Без названия (2).jpg"),
  },

  wedding: {
    w1: pub(catalog, "свадебные", "images.jpg"),
    w2: pub(catalog, "свадебные", "Без названия (1).jpg"),
    w3: pub(catalog, "свадебные", "Без названия (2).jpg"),
    cover: pub(catalog, "свадебные", "Без названия (3).jpg"),
  },

  gifts: {
    g1: pub(catalog, "подарки", "images.jpg"),
    g2: pub(catalog, "подарки", "Без названия.jpg"),
    g3: pub(catalog, "подарки", "images (1).jpg"),
    cover: pub(catalog, "подарки", "images (2).jpg"),
  },

  seasonal: {
    s1: pub(catalog, "сезонные", "Без названия (1).jpg"),
    s2: pub(catalog, "сезонные", "Без названия (2).jpg"),
    s3: pub(catalog, "сезонные", "Без названия (3).jpg"),
    cover: pub(catalog, "сезонные", "Без названия (4).jpg"),
  },

  gallery: [
    pub(gallery, "0716ea87189d1edc68cd2863ddf307c7.jpg"),
    pub(gallery, "19eb5e027e247183b7cae56ecf427867.jpg"),
    pub(gallery, "2512b2a96cd3d0937aaeaa49bb90e468.jpg"),
    pub(gallery, "4096a108363386c82a3af1e5737fec79.jpg"),
    pub(gallery, "4b4dd39c8fa5f13e824db692035eaf2d.jpg"),
    pub(gallery, "6067648a12140ed55b935b4b4d227c88.jpg"),
    pub(gallery, "675d37cd796ac4c3bca3df6844880c61.jpg"),
    pub(gallery, "8a8d436730698de488b331eb7569c464.jpg"),
    pub(gallery, "b26cb7b1362aa912af3b33e90d670f2c.jpg"),
  ],

  services: {
    custom: pub(services, "Авторские букеты", "pexels-micomedel-36222076.jpg"),
    wedding: pub(services, "Свадебная флористика", "pexels-asadphoto-169193.jpg"),
    subscription: pub(services, "Подписка на цветы", "pexels-youssouf-carius-906317932-19862643.jpg"),
    events: pub(gallery, "4096a108363386c82a3af1e5737fec79.jpg"),
  },
} as const;
