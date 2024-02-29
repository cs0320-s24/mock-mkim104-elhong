import { expect, test } from "@playwright/test";

/**
 * Testing...
 */

test.beforeEach(() => {
  // something we need to do before every test case to avoid repeating code
});

test("on page load, i see a login button", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByLabel("Login")).toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

// gearup example:
test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {});

test("after I click the button, I am brought to a command line input", async ({
  page,
}) => {});

test("after I click the enter button, my command history updates", async ({
  page,
}) => {});

// add other shapes, commands, and reachable states
