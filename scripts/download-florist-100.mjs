import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const existingDir = path.join(root, "public", "flower-photos");
const outDir = path.join(root, "public", "flower-photos-2");
const target = 100;
const minBytes = 18000;

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

const BLACKLIST = new Set([
  "265906", "5870315", "931066", "931060", "4197438", "931250", "931300",
  "931037", "2072730", "2072732", "2072733", "2072734", "2072736", "2072737",
  "2072738", "2072739", "2072740", "2072741",
]);

function hashBuffer(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

function loadHashes(dir) {
  const hashes = new Set();
  if (!fs.existsSync(dir)) return hashes;
  for (const file of fs.readdirSync(dir)) {
    if (!/\.jpe?g$/i.test(file)) continue;
    hashes.add(hashBuffer(fs.readFileSync(path.join(dir, file))));
  }
  return hashes;
}

const cmd37 = fs.readFileSync(path.join(__dirname, "line37-cmd.txt"), "utf8");
const cmd72 = fs.readFileSync(path.join(__dirname, "line72-cmd.txt"), "utf8");

const directUrls = [
  ...cmd37.matchAll(/url = \"([^\"]+)\"/g),
].map((m) => m[1]);

const pexelsIds = [
  ...cmd72.matchAll(/id = \"(\d+)\"/g),
]
  .map((m) => m[1])
  .filter((id) => id.length <= 8 && !BLACKLIST.has(id));

const pixabay = [
  "https://cdn.pixabay.com/photo/2015/04/19/08/32/rose-729510_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/02/08/22/27/flower-3140492_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/02/15/13/40/tulips-2068692_1280.jpg",
  "https://cdn.pixabay.com/photo/2013/07/31/bouquet-flowers-flower-arrangement-168831_1280.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/09/16/flowers-1868771_1280.jpg",
  "https://cdn.pixabay.com/photo/2014/05/26/10/25/flower-348252_1280.jpg",
  "https://cdn.pixabay.com/photo/2020/04/09/16/19/flowers-5015506_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/08/06/12/52/rose-2592284_1280.jpg",
];

const sources = [
  ...pixabay,
  ...directUrls,
  ...pexelsIds.map(
    (id) =>
      `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`
  ),
  "https://images.pexels.com/photos/36009/peony-flower-bloom-pink.jpg?auto=compress&cs=tinysrgb&w=1200",
  "https://images.pexels.com/photos/56866/rose-red-bloom-blossom-56866.jpeg?auto=compress&cs=tinysrgb&w=1200",
];

if (fs.existsSync(outDir)) {
  for (const f of fs.readdirSync(outDir)) {
    if (f.endsWith(".jpg")) fs.unlinkSync(path.join(outDir, f));
  }
} else {
  fs.mkdirSync(outDir, { recursive: true });
}

const hashes = loadHashes(existingDir);
let count = 0;

async function trySave(url) {
  if (count >= target) return false;
  const res = await fetch(url, { headers, redirect: "follow" });
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < minBytes) return false;
  const h = hashBuffer(buf);
  if (hashes.has(h)) return false;
  count++;
  fs.writeFileSync(
    path.join(outDir, `florist-${String(count).padStart(3, "0")}.jpg`),
    buf
  );
  hashes.add(h);
  if (count % 10 === 0) console.log(`Progress: ${count}`);
  return true;
}

for (const url of sources) {
  if (count >= target) break;
  try {
    await trySave(url);
  } catch {
    /* skip */
  }
}

const flickrTags = "flower,bouquet,florist,roses,tulips,peony,wedding";
for (let lock = 1; count < target && lock <= 2000; lock++) {
  try {
    await trySave(
      `https://loremflickr.com/1200/800/${flickrTags}?lock=${lock}`
    );
  } catch {
    /* skip */
  }
}

console.log(`DONE: ${count} photos`);
