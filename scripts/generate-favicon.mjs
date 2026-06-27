import sharp from "sharp";
import { join } from "node:path";

const root = process.cwd();
const logoPath = join(root, "public", "logo.png");
const foxCrop = { left: 0, top: 0, width: 290, height: 298 };

async function writeIcon(outputPath, size) {
  await sharp(logoPath)
    .extract(foxCrop)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toFile(outputPath);
}

await writeIcon(join(root, "app", "icon.png"), 32);
await writeIcon(join(root, "app", "apple-icon.png"), 180);
console.log("Generated app/icon.png and app/apple-icon.png");
