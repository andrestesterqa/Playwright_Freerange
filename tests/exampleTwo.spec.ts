import { test, expect } from "@playwright/test";
import { headerSections } from "../testData/testData";
test.describe("Home Page", () => {

    for (const section of headerSections) {
        test(`Header - Validar redirecionamiento a la sección ${section.name}`, async ({ page }) => {
            await test.step("Estando en la pagina de inicio", async () => {
                page.goto("https://www.freerangetesters.com");
                await expect(page).toHaveTitle("Free Range Testers");
            });
            await test.step(`Cuando hago click en el botón ${section.name} desde el Header`, async () => {
                page
                    .locator("#page_header")
                    .getByRole("link", { name: section.name, exact: true })
                    .click();
                await page.waitForURL(`**${section.url}`);
            });

            await test.step(`Entonces debería ver la página de ${section.name}`, async () => {
                await expect(page).toHaveTitle(section.titleExpected);
            });
        });
    }
});