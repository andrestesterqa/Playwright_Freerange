import { test, expect } from "@playwright/test";

test.describe("Automation Sandbox", () => {
  test.beforeEach("Goto Automation Sandbox Page", async ({ page }) => {
    await page.goto(
      "https://thefreerangetester.github.io/sandbox-automation-testing/"
    );
  });

  test(" TestId002 - Click on ID dinamic button ", async ({ page }) => {
    await test.step("When I click on the ID dinamic button", async () => {
      await page
        .getByRole("button", { name: "Hacé click para generar un ID" })
        .click();
    });
    await test.step("Then I should see the hidden element", async () => {
      await expect(page.locator("#hidden-element")).toContainText(
        "OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻."
      );
    });
  });

  test(" TestId003 - Filled text input ", async ({ page }) => {
    await test.step("When I fill the text input", async () => {
      await page
        .getByRole("textbox", { name: "Un aburrido texto" })
        .fill("Hola Mundo 👻");
    });
  });

  test(" TestId004 - Select a Checkbox ", async ({ page }) => {
    await test.step("When I select the checkbox", async () => {
      await page.getByRole("checkbox", { name: "Pizza 🍕" }).check();
    });

    await test.step("Then I should see the checkbox selected", async () => {
      await expect(
        page.getByRole("checkbox", { name: "Pizza 🍕" })
      ).toBeChecked();
    });
  });

  test(" TestId005 - Select a radio button ", async ({ page }) => {
    await test.step("When I select the radio button", async () => {
      await page.getByRole("radio", { name: "No" }).check();
    });

    await test.step("Then I should see the radio button selected", async () => {
      await expect(page.getByRole("radio", { name: "No" })).toBeChecked();
    });
  });

  test(" TestId006 - Select an option from the sports dropdown ", async ({ page }) => {
    await test.step("When I select an option from the dropdown", async () => {
      await page.getByLabel("Dropdown").selectOption("Basketball");
    });
    await test.step("Then I should see the option selected", async () => {
      await expect(page.getByLabel("Dropdown")).toHaveValue("Basketball");
    });
  });

    test(" TestId007 - Select an option from the days of the week", async ({ page }) => {
    await test.step("When I select an option from the days of the week", async () => {
      await page.getByRole('button', { name: 'Día de la semana' }).click();
      await page.getByRole('link', { name: 'Miércoles' }).click();
    });
  });

  test(" TestId008 - Upload a file ", async ({ page }) => {
    await test.step("When I upload a file", async () => {
      await page.setInputFiles('input[type="file"]', 'tests/fixtures/fileToUpload.txt');
      await page.getByLabel("Upload file").setInputFiles('tests/fixtures/fileToUpload.txt');
    });
  });
});
