const res = await fetch(
  "https://www.pexels.com/search/flower%20bouquet/",
  {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
  }
);
const html = await res.text();
const ids = [...new Set([...html.matchAll(/photos\/(\d+)\//g)].map((m) => m[1]))];
console.log("found ids:", ids.length);
console.log(ids.slice(0, 30).join(", "));
