const headers = { "User-Agent": "Mozilla/5.0" };
const ids = [];
for (let i = 931020; i <= 931650; i++) ids.push(i);

let ok = 0;
for (const id of ids) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
  try {
    const res = await fetch(url, { headers });
    const buf = Buffer.from(await res.arrayBuffer());
    if (res.ok && buf.length > 18000) {
      ok++;
      console.log(id, buf.length);
    }
  } catch {}
}
console.log("total ok in 931020-931650:", ok);
