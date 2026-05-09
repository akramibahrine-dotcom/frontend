/**
 * Next standalone output on Windows can omit server/vendor-chunks even though
 * server bundles require them at runtime. Copy them into standalone after build.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, ".next", "server", "vendor-chunks");
const target = path.join(root, ".next", "standalone", ".next", "server", "vendor-chunks");

if (fs.existsSync(source) && fs.existsSync(path.dirname(target))) {
  fs.cpSync(source, target, { recursive: true, force: true });
}
