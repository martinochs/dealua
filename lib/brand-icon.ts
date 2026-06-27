import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** public/logo.png — fox head occupies roughly the left portion of the wide asset */
export const LOGO_WIDTH = 1024;
export const LOGO_HEIGHT = 298;
export const FOX_CROP_WIDTH = 290;

let cachedLogoDataUrl: string | null = null;

export async function getLogoDataUrl(): Promise<string> {
  if (!cachedLogoDataUrl) {
    const file = await readFile(join(process.cwd(), "public", "logo.png"));
    cachedLogoDataUrl = `data:image/png;base64,${file.toString("base64")}`;
  }
  return cachedLogoDataUrl;
}
