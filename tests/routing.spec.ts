import { test, expect } from '@playwright/test';

test.describe('Routing and Navigation Integrity', () => {

  test('Public Home Page loads correctly', async ({ page }) => {
    await page.goto('/');
    // Check if the title contains Kota or something similar, or simply expect the page to load without errors.
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Studio Page loads correctly', async ({ page }) => {
    await page.goto('/studio');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Contact Page loads correctly', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Admin route redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/admin');
    // Middleware should redirect to /login
    await expect(page).toHaveURL(/.*\/login/);
    await expect(page.getByText('RESTRICTED ACCESS', { exact: false })).toBeVisible();
  });

  test('Admin Login page functions', async ({ page }) => {
    await page.goto('/login');
    const identificationInput = page.getByPlaceholder('Identification');
    const passphraseInput = page.getByPlaceholder('Passphrase');
    
    await expect(identificationInput).toBeVisible();
    await expect(passphraseInput).toBeVisible();
  });

});
