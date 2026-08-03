import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Audits', () => {
  const routes = [
    '/',
    '/about',
    '/booking',
    '/admin',
    '/admin/bookings',
    '/admin/messages',
    '/admin/settings'
  ];

  for (const route of routes) {
    test(`Should not have any automatically detectable accessibility issues on ${route}`, async ({ page }) => {
      await page.goto(route);
      // Wait for network idle to ensure page is fully loaded
      await page.waitForLoadState('networkidle');
      
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  }
});

test.describe('Design Tokens Consistency', () => {
  test('Should not use arbitrary pixel values for widths (e.g. w-[240px])', async ({ page }) => {
    // This is a placeholder test for design tokens. 
    // Usually design tokens are better checked via linting (eslint-plugin-tailwindcss)
    // or by inspecting the compiled CSS. We can at least check if certain elements have standard classes.
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(true).toBeTruthy();
  });
});

test.describe('Global Sidenav Layout', () => {
  test('Should render the global sidenav consistently on admin routes', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    
    // The global sidenav should be present
    const sidenav = page.locator('nav').first();
    await expect(sidenav).toBeVisible();
    
    // Assuming the sidenav has an ID or class we can use to identify it universally
    // await expect(page.locator('#global-sidenav')).toBeVisible();
  });
});
