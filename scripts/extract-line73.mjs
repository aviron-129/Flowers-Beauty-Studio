import fs from "fs";

const line = fs
  .readFileSync(
    "C:/Users/aliev/.cursor/projects/c-flowers/agent-transcripts/e56f7da5-dce2-42f0-bef0-dd501b8b3fb1/e56f7da5-dce2-42f0-bef0-dd501b8b3fb1.jsonl",
    "utf8"
  )
  .split("\n")[73];

const j = JSON.parse(line);
const cmd = j.message.content.find((x) => x.input?.command).input.command;

const pexelsIds = [...cmd.matchAll(/id = \"(\d+)\"/g)].map((m) => m[1]);
const unsplashSlugs = [...cmd.matchAll(/slug = \"([^\"]+)\"/g)].map((m) => m[1]);
const pixabay = [...cmd.matchAll(/url = \"(https:\/\/cdn\.pixabay\.com[^\"]+)\"/g)].map((m) => m[1]);

console.log("pexels", pexelsIds.length, pexelsIds.join(", "));
console.log("unsplash", unsplashSlugs.length);
console.log("pixabay", pixabay.length);
