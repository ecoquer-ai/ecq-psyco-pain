import { mkdirSync, writeFileSync, copyFileSync, existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "apps/mobile/assets/images");
const storeDir = join(root, "docs/store/assets");
mkdirSync(outDir, { recursive: true });
mkdirSync(storeDir, { recursive: true });

const iconSvg = join(root, "assets/brand/icon-master.svg");
const markSvg = join(root, "assets/brand/logo-mark.svg");

function renderSvg(svgPath, width) {
  const svg = readFileSync(svgPath);
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
  });
  return resvg.render().asPng();
}

const icon1024 = renderSvg(iconSvg, 1024);
writeFileSync(join(outDir, "icon.png"), icon1024);

const splash = await sharp(icon1024)
  .resize(1024, 1024)
  .png()
  .toBuffer();
writeFileSync(join(outDir, "splash-icon.png"), splash);

const fg = renderSvg(iconSvg, 1024);
writeFileSync(join(outDir, "android-icon-foreground.png"), fg);

const bg = await sharp({
  create: {
    width: 1024,
    height: 1024,
    channels: 3,
    background: "#FFF6EE",
  },
})
  .png()
  .toBuffer();
writeFileSync(join(outDir, "android-icon-background.png"), bg);

const monoSvg = `<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <circle cx="512" cy="512" r="300" fill="none" stroke="#000" stroke-width="42"/>
  <path d="M268 575 C355 390, 430 700, 512 470 C575 310, 640 420, 700 390" fill="none" stroke="#000" stroke-width="46" stroke-linecap="round"/>
  <circle cx="742" cy="355" r="34" fill="#000"/>
</svg>`;
const mono = new Resvg(monoSvg, { fitTo: { mode: "width", value: 1024 } })
  .render()
  .asPng();
writeFileSync(join(outDir, "android-icon-monochrome.png"), mono);

const favicon = await sharp(icon1024).resize(48, 48).png().toBuffer();
writeFileSync(join(outDir, "favicon.png"), favicon);

const generatedFeature = join(
  process.env.USERPROFILE || "",
  ".cursor/projects/c-ecoquerai/assets/neuropi-feature-graphic.png",
);
if (existsSync(generatedFeature)) {
  const feature = await sharp(generatedFeature)
    .resize(1024, 500, { fit: "cover", position: "centre" })
    .png()
    .toBuffer();
  writeFileSync(join(storeDir, "feature-graphic.png"), feature);
  writeFileSync(join(outDir, "feature-graphic.png"), feature);
}

const generatedIcon = join(
  process.env.USERPROFILE || "",
  ".cursor/projects/c-ecoquerai/assets/neuropi-icon-master.png",
);
const generatedSplash = join(
  process.env.USERPROFILE || "",
  ".cursor/projects/c-ecoquerai/assets/neuropi-splash-lockup.png",
);
if (existsSync(generatedIcon)) {
  copyFileSync(generatedIcon, join(root, "assets/brand/neuropi-icon-ai.png"));
}
if (existsSync(generatedSplash)) {
  copyFileSync(generatedSplash, join(root, "assets/brand/neuropi-splash-ai.png"));
  const splashLockup = await sharp(generatedSplash)
    .resize(1284, 2778, { fit: "contain", background: "#FFF6EE" })
    .png()
    .toBuffer();
  writeFileSync(join(outDir, "splash-lockup.png"), splashLockup);
}

copyFileSync(iconSvg, join(root, "apps/mobile/assets/logo-icon.svg"));
copyFileSync(markSvg, join(root, "apps/mobile/assets/logo-mark.svg"));
copyFileSync(join(root, "assets/brand/logo.svg"), join(root, "apps/mobile/assets/logo.svg"));

console.log("Rasterized Neuropi brand assets →", outDir);
