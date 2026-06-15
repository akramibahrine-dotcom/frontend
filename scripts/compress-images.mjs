import sharp from "sharp";
import { readdir, stat, mkdir, copyFile } from "fs/promises";
import { join, extname } from "path";

const PUBLIC_DIR = "public";
const BACKUP_DIR = "public/_backup_originals";
const MAX_WIDTH = 1200;
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 82;
const PNG_QUALITY = 85;

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir.toString(), entry.name);
    if (entry.name.startsWith("_backup")) continue;
    if (entry.isDirectory()) {
      files.push(...(await getAllImages(fullPath)));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch {}
}

async function compressImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const info = await stat(filePath);
  const originalSize = info.size;

  let image = sharp(filePath);
  const metadata = await image.metadata();

  if (metadata.width > MAX_WIDTH) {
    image = image.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  let buffer;
  if (ext === ".webp") {
    buffer = await image.webp({ quality: WEBP_QUALITY, effort: 4 }).toBuffer();
  } else if (ext === ".png") {
    buffer = await image.png({ quality: PNG_QUALITY, compressionLevel: 8 }).toBuffer();
  } else {
    buffer = await image.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
  }

  const newSize = buffer.length;
  const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

  if (newSize < originalSize) {
    const backupPath = filePath.replace(PUBLIC_DIR, BACKUP_DIR);
    await ensureDir(backupPath.substring(0, backupPath.lastIndexOf("\\")));
    await ensureDir(backupPath.substring(0, backupPath.lastIndexOf("/")));
    await copyFile(filePath, backupPath).catch(() => {});
    await sharp(buffer).toFile(filePath);
    return { filePath, originalSize, newSize, savings, skipped: false };
  }

  return { filePath, originalSize, newSize, savings: "0", skipped: true };
}

async function main() {
  console.log("🔍 Scanning for images...");
  const images = await getAllImages(PUBLIC_DIR);
  console.log(`📸 Found ${images.length} images (${(images.reduce((sum, f) => sum, 0))} files)`);

  let totalOriginal = 0;
  let totalNew = 0;
  let compressed = 0;
  let skipped = 0;

  for (let i = 0; i < images.length; i++) {
    try {
      const result = await compressImage(images[i]);
      totalOriginal += result.originalSize;
      totalNew += result.skipped ? result.originalSize : result.newSize;

      if (result.skipped) {
        skipped++;
      } else {
        compressed++;
        console.log(
          `✅ [${i + 1}/${images.length}] ${result.filePath} — ${(result.originalSize / 1024).toFixed(0)}KB → ${(result.newSize / 1024).toFixed(0)}KB (−${result.savings}%)`
        );
      }
    } catch (err) {
      console.error(`❌ Error: ${images[i]} — ${err.message}`);
      skipped++;
    }
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`✅ Compressed: ${compressed} files`);
  console.log(`⏭️  Skipped (already optimal): ${skipped} files`);
  console.log(`📦 Total before: ${(totalOriginal / 1024 / 1024).toFixed(1)} MB`);
  console.log(`📦 Total after:  ${(totalNew / 1024 / 1024).toFixed(1)} MB`);
  console.log(`💾 Saved: ${((totalOriginal - totalNew) / 1024 / 1024).toFixed(1)} MB (${((1 - totalNew / totalOriginal) * 100).toFixed(1)}%)`);
  console.log(`\n🗂️  Originals backed up to: ${BACKUP_DIR}/`);
}

main().catch(console.error);
