const pages = [
  "https://pixabay.com/photos/bouquet-roses-flowers-168832/",
  "https://pixabay.com/photos/rose-flower-plant-blossom-bloom-9603034/",
  "https://pixabay.com/photos/flowers-bouquet-gift-love-4128126/",
  "https://pixabay.com/photos/roses-bouquet-flowers-love-2439269/",
  "https://pixabay.com/photos/flowers-bouquet-colorful-1118048/",
  "https://pixabay.com/photos/rose-blossom-bloom-rose-bloom-1518627/",
  "https://pixabay.com/photos/tulips-flowers-spring-1529332/",
  "https://pixabay.com/photos/peonies-pink-flowers-462397/",
  "https://pixabay.com/photos/sunflower-flower-yellow-1490910/",
  "https://pixabay.com/photos/lily-flower-white-462398/",
  "https://pixabay.com/photos/daisies-flowers-white-462399/",
  "https://pixabay.com/photos/orchid-flower-exotic-462400/",
  "https://pixabay.com/photos/carnations-flowers-pink-462401/",
  "https://pixabay.com/photos/hydrangea-flowers-blue-462402/",
  "https://pixabay.com/photos/chrysanthemum-flower-yellow-462403/",
  "https://pixabay.com/photos/lavender-flowers-purple-462404/",
  "https://pixabay.com/photos/poppies-red-flowers-462405/",
  "https://pixabay.com/photos/iris-flower-purple-462406/",
  "https://pixabay.com/photos/daffodil-flower-yellow-462407/",
  "https://pixabay.com/photos/crocus-flower-spring-462408/",
];

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
};

for (const page of pages) {
  try {
    const res = await fetch(page, { headers, redirect: "follow" });
    const html = await res.text();
    const og = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    console.log(og || "MISSING " + page);
  } catch (e) {
    console.log("ERR", page, e.message);
  }
}
