const { test, expect } = require('@playwright/test');

test('Comprehensive flow of the Command Prompt Interface Application', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.locator('text=Welcome, please log in.')).toBeVisible();
  await page.click('text=Login');
  await expect(page.locator('text=You are logged in')).toBeVisible();

  // Change mode to verbose
  await page.fill('input[type="text"]', 'mode verbose');
  await page.keyboard.press('Enter');
  await expect(page.locator('text=Mode set to verbose')).toBeVisible();

  // Load a CSV file (assuming 'dataset1.csv' is a valid file that can be loaded)
  await page.fill('input[type="text"]', 'load_file dataset1.csv');
  await page.keyboard.press('Enter');
  await expect(page.locator('text=Loaded data from dataset1.csv')).toBeVisible();

  // View loaded data
  await page.fill('input[type="text"]', 'view');
  await page.keyboard.press('Enter');
  await expect(page.locator('text=Displaying loaded data...')).toBeVisible();

  // Perform a search operation
  await page.fill('input[type="text"]', 'search address 123 Main St');
  await page.keyboard.press('Enter');
  await expect(page.locator('text=Found')).toBeVisible();

  // Switch back to brief mode and verify the change
  await page.fill('input[type="text"]', 'mode brief');
  await page.keyboard.press('Enter');
  await expect(page.locator('text=Mode set to brief')).toBeVisible();

});
