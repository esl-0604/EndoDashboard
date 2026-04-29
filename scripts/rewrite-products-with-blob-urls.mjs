// Reads scripts/blob-urls.json and replaces each local /assets/.../*.mp4
// reference inside lib/products.ts with the corresponding Blob URL.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PRODUCTS = join(ROOT, "lib", "products.ts");
const MAP = join(ROOT, "scripts", "blob-urls.json");

const mapping = JSON.parse(readFileSync(MAP, "utf8"));
let src = readFileSync(PRODUCTS, "utf8");

let replaced = 0;
for (const [local, remote] of Object.entries(mapping)) {
  const before = src;
  // Replace double-quoted string literals containing the local path.
  // Use split+join for unambiguous all-occurrences replacement.
  src = src.split(`"${local}"`).join(`"${remote}"`);
  if (src !== before) replaced++;
}

writeFileSync(PRODUCTS, src);
console.log(`Replaced ${replaced} of ${Object.keys(mapping).length} paths.`);
