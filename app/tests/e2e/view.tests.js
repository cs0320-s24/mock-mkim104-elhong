const { test, expect } = require("@playwright/test");


/**
* Page is loaded and user is logged in before each test case.
*/
test.beforeEach(() => {
  page.goto("http://localhost:3000/");
  page.click("text=Login");
});

/**
* Testing view command results.
 */
test.describe("View Command Results", () => {

    // Successful view
    test("Viewing loaded existing filepath", async ({ page }) => {
        await page.fill('input[type="text"]', 'load_file dataset2.csv');
        await page.click('button[type="submit"]');
        await page.fill('input[type="text"]', 'view');
        // Asserting that the view command produces the appropriate message
        await expect(page.waitForSelector('.command-history:has-text("Displaying loaded data...")'));
        await expect(page.locator('text=Displaying loaded data...')).toBeVisible();
        // Asserting table contents
        await expect(page.locator("data").nth(0)).toContainText("789 Pine St");
        await expect(page.locator("data").nth(1)).toContainText("200 Bronx St");
        await expect(page.locator("data").nth(2)).toContainText("434 Providence St");
        await expect(page.locator("data").nth(3)).toContainText("$100,000");
        await expect(page.locator("data").nth(4)).toContainText(5);
        // can also test table length ???
        });

  
    // Viewing without loading first
    test("Viewing without loading", async ({ page }) => {
        await page.fill('input[type="text"]', 'view');
        // Asserting that the view command produces the appropriate message
        await expect( page.waitForSelector('.command-history:has-text("No file has been loaded yet.")'));
        await expect(page.locator('text=No file has been loaded yet.')).toBeVisible();
        // Asserting there is no table
        await expect(page.locator("data")).toBeNull(); // or to be empty???
        });
  
    // Viewing after loading an invalid filepath
    test("Viewing after loading inexistent file", async ({ page }) => {
        await page.fill('input[type="text"]', 'load_file lalala');
        await page.click('button[type="submit"]');
        await page.fill('input[type="text"]', 'view');
         // Asserting that the view command produces the appropriate message
        await expect( page.waitForSelector('.command-history:has-text("No file has been loaded yet.")'));
        await expect(page.locator('text=No file has been loaded yet.')).toBeVisible();
         // Asserting there is no table
        await expect(page.locator("data")).toBeNull(); // or to be empty???
        });
  
    // Viewing the correct file after loading twice
    test("Viewing after two consecutive loads", async ({ page }) => {
        await page.fill('input[type="text"]', 'load_file dataset2.csv');
        await page.click('button[type="submit"]');
        await page.fill('input[type="text"]', 'load_file dataset1.csv');
        await page.click('button[type="submit"]');
        await page.fill('input[type="text"]', 'view');
        // Asserting that the updated table is displayed
        await expect(page.locator('text=Displaying loaded data...')).toBeVisible();
        await expect(page.locator("data").nth(0)).toContainText("123 Main St");
    });
    });