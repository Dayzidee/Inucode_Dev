import { test, expect, Page } from "@playwright/test";

const ALL_VIEWPORTS = [
  // Mobile
  { name: "iPhoneSE", width: 375, height: 812 },
  { name: "iPhone14", width: 390, height: 844 },
  { name: "Pixel7", width: 412, height: 915 },
  // Tablet
  { name: "iPadMini", width: 768, height: 1024 },
  { name: "iPadPro", width: 1024, height: 1366 },
];

const PAGES = [
  { path: "/", name: "Homepage" },
  { path: "/about", name: "About" },
  { path: "/studio", name: "Studio" },
  { path: "/journal", name: "Journal" },
  { path: "/contact", name: "Contact" },
];

const BASE_URL = "http://localhost:3005";

async function checkNoHorizontalScroll(page: Page) {
  return await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
}

async function checkElementsInViewport(page: Page) {
  return await page.evaluate(() => {
    const vw = window.innerWidth;
    const offenders: string[] = [];
    document.querySelectorAll("*").forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.right > vw + 5) {
        const tag = el.tagName.toLowerCase();
        const cls = (el as HTMLElement).className?.toString().slice(0, 60) || "";
        const text = (el as HTMLElement).textContent?.trim().slice(0, 30) || "";
        offenders.push(`${tag}[${cls}] "${text}"`);
      }
    });
    return offenders.slice(0, 10);
  });
}

for (const viewport of ALL_VIEWPORTS) {
  test.describe(`Viewport: ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const pg of PAGES) {
      test(`${pg.name} - no horizontal scroll`, async ({ page }) => {
        await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(1000);

        const hasOverflow = await checkNoHorizontalScroll(page);
        expect(hasOverflow, `Horizontal scroll on ${pg.name}`).toBe(false);
      });

      test(`${pg.name} - no elements overflow viewport`, async ({ page }) => {
        await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(1000);

        const violations = await checkElementsInViewport(page);
        expect(violations, `Elements overflow on ${pg.name}: ${violations.join(" | ")}`).toHaveLength(0);
      });

      test(`${pg.name} - nav is visible`, async ({ page }) => {
        await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: "domcontentloaded" });
        const nav = page.locator("nav, header").first();
        await expect(nav).toBeVisible();
      });

      test(`${pg.name} - h1 heading is visible`, async ({ page }) => {
        await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(1000);
        const h1 = page.locator("h1").first();
        await expect(h1).toBeVisible();
      });
    }

    test("Homepage - bento cards stay visible after scroll", async ({ page }) => {
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1000);
      await page.evaluate(() => window.scrollTo(0, 1800));
      await page.waitForTimeout(800);
      
      const bentoItems = page.locator(".bento-card");
      const count = await bentoItems.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        await expect(bentoItems.nth(i)).toBeVisible();
      }
    });

    test("Homepage - CTA button visible", async ({ page }) => {
      await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1000);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(800);
      const startProject = page.getByText("START A").first();
      await expect(startProject).toBeVisible();
    });
  });
}
