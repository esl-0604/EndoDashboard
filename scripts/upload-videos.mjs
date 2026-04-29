// Uploads every .mp4 under public/assets/ to Vercel Blob and writes a
// pathname → blob URL mapping to scripts/blob-urls.json so the calling
// agent can rewrite product src paths in lib/products.ts.
//
// Usage:
//   BLOB_READ_WRITE_TOKEN=xxxxx node scripts/upload-videos.mjs

import { put } from "@vercel/blob";
import { readFileSync, writeFileSync, statSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const ROOT = process.cwd();
const ASSETS_DIR = join(ROOT, "public", "assets");

async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.isFile() && /\.mp4$/i.test(e.name)) out.push(full);
  }
  return out;
}

function toPosix(p) {
  return p.split(sep).join("/");
}

async function main() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error("BLOB_READ_WRITE_TOKEN env var is required.");
    process.exit(1);
  }

  const files = await walk(ASSETS_DIR);
  if (files.length === 0) {
    console.error("No .mp4 files found under public/assets/.");
    process.exit(1);
  }

  const mapping = {};
  for (const filePath of files) {
    const rel = toPosix(relative(join(ROOT, "public"), filePath));
    const size = statSync(filePath).size;
    process.stdout.write(`Uploading ${rel} (${(size / 1e6).toFixed(1)} MB) ... `);
    const body = readFileSync(filePath);
    const blob = await put(rel, body, {
      access: "public",
      contentType: "video/mp4",
      addRandomSuffix: false,
      allowOverwrite: true,
      multipart: true,
      token,
    });
    mapping["/" + rel] = blob.url;
    console.log("done →", blob.url);
  }

  const outPath = join(ROOT, "scripts", "blob-urls.json");
  writeFileSync(outPath, JSON.stringify(mapping, null, 2));
  console.log(`\nWrote ${Object.keys(mapping).length} entries to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
