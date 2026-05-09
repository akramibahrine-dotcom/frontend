/**
 * Removes local Next.js output and caches that can go stale and cause:
 * "Cannot find module './611.js'" / missing webpack chunks.
 * Safe on Windows/macOS/Linux (no rimraf dependency).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const paths = [".next", ".turbo", path.join("node_modules", ".cache")];

for (const rel of paths) {
  const target = path.join(root, rel);
  try {
    fs.rmSync(target, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
}
