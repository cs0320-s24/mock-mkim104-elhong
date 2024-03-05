const { test, expect } = require("@playwright/test");

/**
* Testing search command results.
*/
test.describe("Search Command Results", () => {

    // Successful search
    test("Searching loaded filepath with a match", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'load_file dataset2.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'search id 1');
        await page.keyboard.press('Enter');
        await expect(page.locator('text=Found')).toBeVisible();
        await expect(page.locator('text=789 Pine St')).toBeVisible();
    });

    // Successful search with no matches
    test("Searching loaded filepath with no matches", async ({page,}) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'load_file dataset1.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'search address tomato');
        await page.keyboard.press('Enter');
        await expect(page.locator('text=No results found for')).toBeVisible();
    });

    // Searching wihtou first loading
    test("Searching without load", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'search address tomato');
        await page.keyboard.press('Enter');
        await expect(page.locator('text=Please load and view a csv')).toBeVisible();
    });

    // Searching after two distinc loads
    test("Searching with two loads", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'load_file dataset1.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'load_file dataset2.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'search address 123 Main St');
        await page.keyboard.press('Enter');
        // Asserting that the loaded file does not contain elements from the previously loaded file
        await expect(page.locator('text=No results found for')).toBeVisible();
    });

    // Searching a csv with only one column 
    test("Searching one column csv", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'load_file dataset3.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'search id 2');
        await page.keyboard.press('Enter');
        await expect(page.locator('text=Found 1 results for "2" in id')).toBeVisible();
    });

    // Searching a csv with only one row
    test("Searching one row csv", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'load_file dataset1.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'search id 1');
        await page.keyboard.press('Enter');
        await expect(page.locator('text=Found')).toBeVisible();
        await expect(page.locator('text=123 Main St')).toBeVisible();
    });

    // Searching a csv with empty strings as data and multiple results
    test("Searching multiple results", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'load_file dataset4.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'search address  ');
        await page.keyboard.press('Enter');
        await expect(page.locator('text=Invalid search format. CSV file is misformed.')).toBeVisible();
    });

    // Searching without any column input
    test("Searching without column input", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'load_file dataset1.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'search 123 Main St');
        await page.keyboard.press('Enter');
        await expect(page.locator('text=Invalid column name "123".')).toBeVisible();
    });

    // Searching without any search word input
    test("Searching without search word input", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'load_file dataset1.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'search id');
        await page.keyboard.press('Enter');
        await expect(page.locator('text=Invalid search format.')).toBeVisible();
    });

    // Searching without any input 
    test("Searching with neither column nor word", async ({ page }) => {
        await page.goto("http://localhost:3000/");
        await page.click("text=Login");
        await page.fill('input[type="text"]', 'load_file dataset1.csv');
        await page.keyboard.press('Enter');
        await page.fill('input[type="text"]', 'search');
        await page.keyboard.press('Enter');
        await expect(page.locator('text=Invalid search format.')).toBeVisible();
    });

  });
