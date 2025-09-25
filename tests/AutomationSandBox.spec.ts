import { test, expect } from "@playwright/test";

test.describe("Automation Sandbox", () => {
  test.beforeEach("Goto Automation Sandbox Page", async ({ page }) => {
    await page.goto(
      "https://thefreerangetester.github.io/sandbox-automation-testing/"
    );
  });

  let textToCheck: string = "Hola Mundo 👻";

  test(" TestId002 - Click on ID dinamic button ", async ({ page }) => {
    await test.step("When I click on the ID dinamic button", async () => {
      await page
        .getByRole("button", { name: "Hacé click para generar un ID" })
        .click();
    });
    await test.step("Then I should see the hidden element", async () => {
      await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
    });
  });

  test(" TestId003 - Filled text input ", async ({ page }) => {
    await test.step("When I fill the text input", async () => {
      await page
        .getByRole("textbox", { name: "Un aburrido texto" })
        .fill(textToCheck);
    });

    await test.step("Then I should see the text input filled", async () => {
      await expect(
        page.getByRole("textbox", { name: "Un aburrido texto" })
      ).toHaveValue(textToCheck);
    });
  });

  test(" TestId004 - Select a Checkbox ", async ({ page }) => {
    await test.step("When I select the checkbox", async () => {
      await page.getByRole('checkbox', { name: 'Pizza 🍕' }).check();
    });

    await test.step("Then I should see the checkbox selected", async () => {
      await expect(page.getByRole('checkbox', { name: 'Pizza 🍕' }), 'NO esta seleccionado').toBeChecked();
    });
  });

  test(" TestId005 - Select a radio button ", async ({ page }) => {
    await test.step("When I select the radio button", async () => {
      await page.getByRole("radio", { name: "No" }).check();
    });

    await test.step("Then I should see the radio button selected", async () => {
      await expect(page.getByRole("radio", { name: "No" }), 'Radio button is not checked').toBeChecked();
    });
  });

  test(" TestId006 - Select an option from the sports dropdown ", async ({ page }) => {

    await test.step("Validating the expected dropdown options", async () => {
      const sports: string[] = ["Fútbol", "Basketball", "Tennis"];
      for (const sport of sports) {
        const option = page.getByLabel("Dropdown").getByRole('option', { name: sport });
        await expect(option, `Option ${sport} not found in the dropdown`).toHaveCount(1);
      }
      
    })
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
});
