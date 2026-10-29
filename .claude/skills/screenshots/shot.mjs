import { chromium } from "@playwright/test";

const [url, out] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 820 } });
await page.goto(url);
// Firestore holds a connection open, so networkidle never fires.
await page.waitForTimeout(3000);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
