import { test, expect } from '@playwright/test';

test("Make a mock of a fruit that does not exist", async ({ page }) => {
    // Make a mock of the API before to navegate to the page
    await page.route('*/**/api/v1/fruits', async route => {
        // Create a fake response
        const json = [{ "name": "Dragon fruit", "id": 1 }];
        await route.fulfill({ json });
    });    
    // Go to the page
    await page.goto('https://demo.playwright.dev/api-mocking');

    // Validate that the fruit that we mocked is in the page
    await expect(page.getByText('Dragon fruit')).toBeVisible();
});

test("Block the API and validate the error message", async ({ page }) => {
    // Block the API before to navegate to the page
    await page.route('*/**/api/v1/fruits', async route => {
        // Abort the request
        await route.abort();
    });    
    // Go to the page
    await page.goto('https://demo.playwright.dev/api-mocking');

    // Validate that the error message is in the page
    await expect(page.getByText('Loading...')).toBeVisible();
});

test("Obtained the real API response and then add a new item ", async ({ page }) => {
    // Intercept the API before to navegate to the page
    await page.route('*/**/api/v1/fruits', async route => {
        // Get the real response
        const response = await route.fetch();
        // Get the JSON data from the response
        const json = await response.json();
        // Add a new item to the array
        json.push({ "name": "Dragon Ball Super", "id": 1 });
        // Create a fake response
        await route.fulfill({ json });
    });    
    // Go to the page
    await page.goto('https://demo.playwright.dev/api-mocking');
    // Validate that the fruit that we mocked is in the page
    await expect(page.getByText('Dragon Ball Super', { exact: true })).toBeVisible();
});