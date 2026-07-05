// Visual regression for the /clients "Full Lifecycle Capability" fleet band.
// Run: node tests/visual/fleet-band.spec.mjs [--update]
//
// Captures a screenshot of the .fleet-cap-band section at three viewports
// (mobile, tablet, desktop) and compares against baselines in
// tests/visual/__baselines__/. Use --update to (re)generate baselines
// after intentional typography/layout changes.

import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASELINE_DIR = join(__dirname, "__baselines__");
const OUTPUT_DIR = join(__dirname, "__output__");
const DIFF_DIR = join(__dirname, "__diff__");
for (const d of [BASELINE_DIR, OUTPUT_DIR, DIFF_DIR]) mkdirSync(d, { recursive: true });

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";
const UPDATE = process.argv.includes("--update");
// Small % tolerance to absorb subpixel font hinting jitter.
const THRESHOLD_RATIO = 0.02;

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 900, dpr: 2 },
  { name: "tablet", width: 834, height: 1100, dpr: 2 },
  { name: "desktop", width: 1440, height: 1200, dpr: 1 },
];

async function captureFleetBand(page) {
  await page.goto(`${BASE_URL}/clients`, { waitUntil: "networkidle" });
  const band = page.locator(".fleet-cap-band").first();
  await band.waitFor({ state: "visible", timeout: 10_000 });
  // Force any reveal animations to their final state for stable snapshots.
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
      .fleet-cap-band, .fleet-cap-band * { opacity: 1 !important; transform: none !important; }
    `,
  });
  await band.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  return band.screenshot();
}

function compare(name, actualBuf) {
  const baselinePath = join(BASELINE_DIR, `${name}.png`);
  const actualPath = join(OUTPUT_DIR, `${name}.png`);
  writeFileSync(actualPath, actualBuf);

  if (UPDATE || !existsSync(baselinePath)) {
    writeFileSync(baselinePath, actualBuf);
    return { name, status: UPDATE ? "updated" : "created" };
  }

  const baseline = PNG.sync.read(readFileSync(baselinePath));
  const actual = PNG.sync.read(actualBuf);
  if (baseline.width !== actual.width || baseline.height !== actual.height) {
    return {
      name,
      status: "fail",
      reason: `size mismatch: baseline ${baseline.width}x${baseline.height} vs actual ${actual.width}x${actual.height}`,
    };
  }
  const { width, height } = baseline;
  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(baseline.data, actual.data, diff.data, width, height, {
    threshold: 0.1,
  });
  const ratio = mismatched / (width * height);
  if (ratio > THRESHOLD_RATIO) {
    writeFileSync(join(DIFF_DIR, `${name}.png`), PNG.sync.write(diff));
    return { name, status: "fail", reason: `${(ratio * 100).toFixed(3)}% pixels differ` };
  }
  return { name, status: "pass", reason: `${(ratio * 100).toFixed(3)}% diff` };
}

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
});
const results = [];
try {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.dpr,
    });
    const page = await context.newPage();
    const buf = await captureFleetBand(page);
    results.push(compare(vp.name, buf));
    await context.close();
  }
} finally {
  await browser.close();
}

let failed = 0;
for (const r of results) {
  const tag = r.status.toUpperCase().padEnd(8);
  console.log(`${tag} ${r.name}${r.reason ? ` — ${r.reason}` : ""}`);
  if (r.status === "fail") failed++;
}
if (failed > 0) {
  console.error(`\n${failed} visual regression(s). See tests/visual/__diff__/.`);
  console.error(`If the change is intentional, rerun with --update.`);
  process.exit(1);
}
