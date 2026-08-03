import { test, expect } from '@playwright/test';

const PAGES = ['/', '/about', '/studio'];

for (const pagePath of PAGES) {
  test.describe(`Responsiveness on ${pagePath}`, () => {
    test('should not have horizontal scroll / overflow', async ({ page, isMobile }) => {
      await page.goto(pagePath);
      
      // Allow animations to settle
      await page.waitForTimeout(1000);

      // Evaluate if the page width is greater than the viewport width
      const hasHorizontalScrollbar = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasHorizontalScrollbar).toBeFalsy();
    });

    test('should render hero section without breaking', async ({ page }) => {
      await page.goto(pagePath);
      
      // Example: We expect the H1 to be visible on all pages
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    });
  });
}
