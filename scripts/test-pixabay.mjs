const pixabay = [
  "https://cdn.pixabay.com/photo/2013/07/31/bouquet-flowers-flower-arrangement-168831_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729510_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/09/16/flowers-1868771_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/05/26/10/25/flower-348252_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/04/05/14/01/rose-3293602_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/04/09/16/19/flowers-5015506_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/06/12/52/rose-2592284_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/05/04/10/32/flowers-1371326_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/07/16/18/22/tulip-1518284_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/15/13/40/tulips-2068692_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/01/29/07/47/pink-3111835_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/01/31/14/30/flowers-2027857_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/03/28/09/47/magnolia-3268689_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/04/06/22/35/water-lily-71169_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/03/53/flowers-1868725_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/05/04/10/32/flowers-1371328_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/01/04/09/31/roses-3052477_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/08/08/20/flowers-2046550_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/08/41/flower-1868680_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/07/16/47/bouquet-2046616_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/07/14/02/peonies-2601279_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/04/05/14/01/roses-3293603_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/18/16/38/hydrangea-1836318_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/05/07/12/43/flower-756882_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/04/06/13/17/rose-3297561_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/12/46/chrysanthemum-1868825_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/07/25/01/22/pink-2534863_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/12/07/27/rose-2055190_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/09/38/anemone-1868785_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/03/58/flower-1868727_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/07/01/08/22/rose-2531774_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/02/06/14/07/petals-3135823_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/09/41/flower-1868788_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/03/09/48/flowers-2533094_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/12/50/chrysanthemum-1868829_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/04/10/flowers-1868736_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/07/19/08/00/flowers-1522464_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/05/04/20/01/kalanchoe-3376785_1280.jpg",
  "https://cdn.pixabay.com/photo/2015/09/02/13/25/sunflower-918507_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/04/01/10/11/anniversary-1301283_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/05/15/12/24/lotus-2315053_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/13/56/garden-1868905_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/07/16/47/bouquet-2046616_1280.jpg",
];

const headers = { "User-Agent": "Mozilla/5.0" };
const ok = [];
for (const url of pixabay) {
  try {
    const res = await fetch(url, { headers });
    const buf = Buffer.from(await res.arrayBuffer());
    if (res.ok && buf.length > 18000) ok.push(url);
    else console.log("skip", buf.length, url.split("/").pop());
  } catch {
    console.log("err", url.split("/").pop());
  }
}
console.log("working:", ok.length);
ok.forEach((u) => console.log(u));
