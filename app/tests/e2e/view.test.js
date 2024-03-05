const { test, expect } = require("@playwright/test");

/**
* Testing view command results.
 */
test.describe("View Command Results", () => {

    // Successful view
    test("Viewing loaded existing filepath", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'load_file dataset2.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'view');
        await page.keyboard.press('Enter');
        // Asserting that the view command produces the appropriate message
        await expect(page.locator('text=Displaying loaded data...')).toBeVisible();
        // Asserting table contents
        await expect(page.locator('text=789 Pine St')).toBeVisible();
        await expect(page.locator('text=200 Bronx St')).toBeVisible();
        await expect(page.locator('text=400000')).toBeVisible();
        await expect(page.locator('text=300000')).toBeVisible();
        });

  
    // Viewing without loading first
    test("Viewing without loading", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'view');
        await page.keyboard.press('Enter');
        // Asserting that the view command produces the appropriate message
        await expect(page.locator('text=No file has been loaded yet.')).toBeVisible();
        });
  
    // Viewing after loading an invalid filepath
    test("Viewing after loading inexistent file", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'load_file lalala');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'view');
        await page.keyboard.press('Enter');
         // Asserting that the view command produces the appropriate message
        await expect(page.locator('text=No file has been loaded yet.')).toBeVisible();
        });
  
    // Viewing the correct file after loading twice
    test("Viewing after two consecutive loads", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'load_file dataset2.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'load_file dataset1.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'view');
        await page.keyboard.press('Enter');
        // Asserting that the updated table is displayed
        await expect(page.locator('text=Displaying loaded data...')).toBeVisible();
        await expect(page.locator('text=123 Main St')).toBeVisible();
    });
    });