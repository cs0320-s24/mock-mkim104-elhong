const { test, expect } = require("@playwright/test");

/**
* Page is loaded and user is logged in before each test case.
*/
test.beforeEach(() => {
  page.goto("http://localhost:3000/");
  page.click("text=Login");
});

  /**
   * Testing load command results.
   */

test.describe("Load Command Results", () => {

    // Successful load
    test("Loading existing filepath", async ({ page }) => {
        await page.fill('input[type="text"]', 'load_file dataset2.csv');
      await page.click('text=Execute');
      // Asserting that the command history contains the loaded file path
      await page.waitForSelector('.command-history:has-text("Loaded data from dataset2.csv")');
      await expect(page.locator('text=Loaded data from dataset2.csv')).toBeVisible();
    });

    // Loading invalid filepath
    test("Loading non-existent filepath", async ({ page }) => {
    await page.fill('input[type="text"]', 'load_file lala');
      await page.click('text=Execute');
      await expect( page.waitForSelector(`.command-history:has-text("File not found")`)
      );
      await expect(page.locator('text=File not found')).toBeVisible();
    });

    // Loading with no filepath
    test("Loading with no filepath", async ({ page }) => {
      await page.fill('input[type="text"]', 'load_file');
      await page.click('text=Execute');
      await expect(page.locator('text=File not found')).toBeVisible();
    });

});