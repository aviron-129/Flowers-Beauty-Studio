import fs from "fs";

const lines = fs
  .readFileSync(
    "C:/Users/aliev/.cursor/projects/c-flowers/agent-transcripts/e56f7da5-dce2-42f0-bef0-dd501b8b3fb1/e56f7da5-dce2-42f0-bef0-dd501b8b3fb1.jsonl",
    "utf8"
  )
  .split("\n");

const all = new Set();
for (let i = 0; i < lines.length; i++) {
  if (!lines[i].includes("pexels.com") && !lines[i].includes("pixabay.com") && !lines[i].includes("unsplash.com"))
    continue;
  try {
    const j = JSON.parse(lines[i]);
    const cmd =
      j.message?.content?.find((x) => x.input?.command)?.input?.command || "";
    for (const m of cmd.matchAll(/https?:[^"\\]+/g)) {
      const u = m[0];
      if (u.includes("$id")) continue;
      if (/pexels|pixabay|unsplash/.test(u)) all.add(u.split("&")[0].replace(/\?w=\d+$/, ""));
    }
  } catch {
    /* skip */
  }
}

console.log("total unique urls:", all.size);
[...all].sort().forEach((u) => console.log(u));
