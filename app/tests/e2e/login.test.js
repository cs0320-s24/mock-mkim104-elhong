const { test, expect } = require('@playwright/test');

test.describe('Command Prompt Interface Application', () => {

  // Testing login functionality
  test('User can log in', async ({ page }) => {
    await page.goto('http://localhost:3000/'); // Adjust URL as necessary
    await expect(page.locator('text=Welcome, please log in.')).toBeVisible();
    await page.click('text=Login');
    await expect(page.locator('h2:text("You are logged in")')).toBeVisible();
  });

  // Testing login functionality: Timeout error if other commands are somehow executed when not logged in
  test('User cannot run commands when not authenticated', async ({ page }) => {
    await page.goto('http://localhost:3000/'); // Adjust URL as necessary
    await expect(page.locator('text=Welcome, please log in.')).toBeVisible();
  
    // Try running a command
    await Promise.race([
      page.fill('input[type="text"]', 'mode brief'),
      page.waitForTimeout(1000)
    ]);
    await page.waitForFunction(() => {
      const input = document.querySelector('input[type="text"]');
      return !input?.value;
    }, { timeout: 5000 });
  
    // Ensure the command was not executed (i.e., no result in history)
    await expect(page.locator('text=mode brief')).not.toBeVisible();
  });
});
