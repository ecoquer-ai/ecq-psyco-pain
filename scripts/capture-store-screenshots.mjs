import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "docs/store/assets/screenshots");
mkdirSync(outDir, { recursive: true });

const base = process.env.NEUROPI_WEB_URL || "https://ecq-psyco-pain.vercel.app";
const routes = [
  { slug: "welcome", path: "/welcome" },
  { slug: "what", path: "/what-neuropi-does" },
  { slug: "goal", path: "/goal" },
  { slug: "home", path: "/" },
  { slug: "library", path: "/library" },
  { slug: "checkin", path: "/checkin" },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 430, height: 932 },
  deviceScaleFactor: 3,
  isMobile: true,
  hasTouch: true,
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});
const page = await context.newPage();

for (const route of routes) {
  await page.goto(`${base}${route.path}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1200);
  const png = await page.screenshot({ type: "png", fullPage: false });
  const ios = await sharp(png)
    .resize(1284, 2778, { fit: "cover", position: "top" })
    .png()
    .toBuffer();
  const play = await sharp(png)
    .resize(1080, 1920, { fit: "cover", position: "top" })
    .jpeg({ quality: 90 })
    .toBuffer();
  writeFileSync(join(outDir, `ios-${route.slug}.png`), ios);
  writeFileSync(join(outDir, `play-${route.slug}.jpg`), play);
  console.log("captured", route.slug);
}

const icon512 = await sharp(join(root, "apps/mobile/assets/images/icon.png"))
  .resize(512, 512)
  .png()
  .toBuffer();
writeFileSync(join(root, "docs/store/assets/play-icon-512.png"), icon512);
console.log("wrote play-icon-512.png");

await browser.close();
