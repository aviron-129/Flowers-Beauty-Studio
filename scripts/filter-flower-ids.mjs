const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

const flowerWords =
  /flower|bouquet|rose|tulip|peoni|floral|bloom|petal|wedding|lily|orchid|daisy|sunflower|hydrangea|ranunculus|eustoma|lisianthus|florist|spring flowers|romantic bouquet/i;

const ids = [];
for (let id = 931147; id <= 931333; id++) ids.push(id);

const good = [];
for (const id of ids) {
  try {
    const res = await fetch(`https://www.pexels.com/photo/${id}/`, {
      headers,
      redirect: "follow",
    });
    const html = await res.text();
    const title =
      html.match(/<title>([^<]+)<\/title>/i)?.[1] ||
      html.match(/"title":"([^"]+)"/)?.[1] ||
      "";
    const slug = html.match(/\/photo\/([^/"]+)-\d+\//)?.[1] || "";
    const text = `${title} ${slug}`;
    if (flowerWords.test(text)) {
      good.push(id);
      console.log("OK", id, text.slice(0, 80));
    } else {
      console.log("SKIP", id, text.slice(0, 60));
    }
    await new Promise((r) => setTimeout(r, 200));
  } catch (e) {
    console.log("ERR", id);
  }
}
console.log("\nFlower IDs:", good.length);
console.log(good.join(", "));
