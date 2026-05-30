import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cmd37 = fs.readFileSync(path.join(__dirname, "line37-cmd.txt"), "utf8");
const cmd72 = fs.readFileSync(path.join(__dirname, "line72-cmd.txt"), "utf8");
const urls = [...cmd37.matchAll(/url = \"([^\"]+)\"/g)].map((m) => m[1]);
const headers = { "User-Agent": "Mozilla/5.0" };

for (const url of urls) {
  try {
    const res = await fetch(url, { headers, redirect: "follow" });
    const buf = Buffer.from(await res.arrayBuffer());
    console.log(res.ok ? "OK" : "BAD", buf.length, url.slice(0, 80));
  } catch (e) {
    console.log("ERR", url.slice(0, 80));
  }
}
