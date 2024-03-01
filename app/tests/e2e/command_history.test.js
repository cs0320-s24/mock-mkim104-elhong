const { test, expect } = require('@playwright/test');

test.describe('Command Prompt Interface Application', () => {

//Test Changing Modes
  test('User can change mode', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('text=Welcome, please log in.')).toBeVisible();
    await page.click('text=Login');
    await expect(page.locator('h2:text("You are logged in")')).toBeVisible();
    // Change to verbose mode
    await page.fill('input[type="text"]', 'mode verbose');
    await page.keyboard.press('Enter');
    // Wait for the command output to be visible in verbose format
    await expect(page.locator('text=Command: mode verbose')).toBeVisible();
    await expect(page.locator('text=Output: Mode set to verbose')).toBeVisible();
  
    // Change to brief mode
    await page.fill('input[type="text"]', 'mode brief');
    await page.keyboard.press('Enter');
    // Since in brief mode, the output might be simpler, just check for the result
    await expect(page.locator('text=Mode set to brief')).toBeVisible();
  });

  // Verifying Command History in Brief Mode
  test('Command history in brief mode', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('text=Welcome, please log in.')).toBeVisible();
    await page.click('text=Login');
    await expect(page.locator('h2:text("You are logged in")')).toBeVisible();
    await page.fill('input[type="text"]', 'mode brief');
    await page.keyboard.press('Enter');
  
    // Execute a test command, e.g., viewing data
    await page.fill('input[type="text"]', 'view');
    await page.keyboard.press('Enter');
    
    // Verify the command result is correctly displayed in brief mode
    await expect(page.locator('text=No file has been loaded yet.')).toBeVisible();
  });

  // Verifying Command History in Verbose Mode with Loading File
  test('Command history in verbose mode', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('text=Welcome, please log in.')).toBeVisible();
    await page.click('text=Login');
    await expect(page.locator('h2:text("You are logged in")')).toBeVisible();
    await page.fill('input[type="text"]', 'mode verbose');
    await page.keyboard.press('Enter');

    // Execute a test command, e.g., loading a file
    await page.fill('input[type="text"]', 'load_file dataset1.csv');
    await page.keyboard.press('Enter');
    
    // Verify both the command and its output are displayed in verbose mode
    await expect(page.locator('text=Command: load_file dataset1.csv')).toBeVisible();
    await expect(page.locator('text=Output: Loaded data from dataset1.csv')).toBeVisible();
  });

  // Verifying Command History for Error Handling and Invalid Commands
  test('Error handling for invalid commands', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page.locator('text=Welcome, please log in.')).toBeVisible();
    await page.click('text=Login');
    await expect(page.locator('h2:text("You are logged in")')).toBeVisible();
    await page.fill('input[type="text"]', 'mode verbose');
    await page.keyboard.press('Enter');
  
    // Execute an invalid command
    await page.fill('input[type="text"]', 'invalid_command');
    await page.keyboard.press('Enter');
    await expect(page.locator('text=Unrecognized command')).toBeVisible();
  });
  

});