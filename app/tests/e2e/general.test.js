const { test, expect } = require('@playwright/test');

test.describe('Command Prompt Interface Application', () => {

  // Testing login functionality
  test('User can log in', async ({ page }) => {
    await page.goto('http://localhost:3000/'); // Adjust URL as necessary
    await expect(page.locator('text=Welcome, please log in.')).toBeVisible();
    await page.click('text=Login');
    await expect(page.locator('h2:text("You are logged in")')).toBeVisible();
  });
});
