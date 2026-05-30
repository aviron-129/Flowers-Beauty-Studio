const res = await fetch("https://www.pexels.com/@secret-garden-931162/", {
  headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
});
const html = await res.text();
const ids = [...new Set([...html.matchAll(/\/photo\/[^/"]*-(\d+)\//g)].map((m) => m[1]))];
console.log("ids:", ids.length);
console.log(ids.slice(0, 50).join(", "));
