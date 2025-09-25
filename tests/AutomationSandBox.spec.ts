import { test, expect } from "@playwright/test";

test.describe("Automation Sandbox", () => {
  test.beforeEach("Goto Automation Sandbox Page", async ({ page }) => {
    await page.goto(" ");
  });

  let textToCheck: string = "Hola Mundo 👻";

  test(" TestId001 - Click on ID dinamic button ", async ({ page }) => {
    await test.step("When I click on the ID dinamic button", async () => {
      await page
        .getByRole("button", { name: "Hacé click para generar un ID" })
        .click();
    });
    await test.step("Then I should see the hidden element", async () => {
      await expect(page.getByText("OMG, aparezco después de 3")).toBeVisible();
    });
  });

  test(" TestId002 - Filled text input ", async ({ page }) => {
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

  test(" TestId003 - Select a Checkbox ", async ({ page }) => {
    await test.step("When I select the checkbox", async () => {
      await page.getByRole("checkbox", { name: "Pizza 🍕" }).check();
    });

    await test.step("Then I should see the checkbox selected", async () => {
      await expect(
        page.getByRole("checkbox", { name: "Pizza 🍕" }),
        "NO esta seleccionado"
      ).toBeChecked();
    });
  });

  test(" TestId004 - Select a radio button ", async ({ page }) => {
    await test.step("When I select the radio button", async () => {
      await page.getByRole("radio", { name: "No" }).check();
    });

    await test.step("Then I should see the radio button selected", async () => {
      await expect(
        page.getByRole("radio", { name: "No" }),
        "Radio button is not checked"
      ).toBeChecked();
    });
  });

  test(" TestId005 - Select an option from the sports dropdown ", async ({
    page,
  }) => {
    await test.step("Validating the expected dropdown options", async () => {
      const sports: string[] = ["Fútbol", "Basketball", "Tennis"];
      for (const sport of sports) {
        const option = page
          .getByLabel("Dropdown")
          .getByRole("option", { name: sport });
        await expect(
          option,
          `Option ${sport} not found in the dropdown`
        ).toHaveCount(1);
      }
    });
    await test.step("When I select an option from the dropdown", async () => {
      await page.getByLabel("Dropdown").selectOption("Basketball");
    });
    await test.step("Then I should see the option selected", async () => {
      await expect(page.getByLabel("Dropdown")).toHaveValue("Basketball");
    });
  });

  test(" TestId006 - Select an option from the days of the week", async ({
    page,
  }) => {
    await test.step("When I select an option from the days of the week", async () => {
      await page.getByRole("button", { name: "Día de la semana" }).click();
      await page.getByRole("link", { name: "Miércoles" }).click();
    });
  });

  test(" TestId007 - Validating content of static table elements ", async ({
    page,
  }) => {
    await test.step("I can validate the content of Name column", async () => {
      const names: string[] = ["Messi", "Ronaldo", "Mbappe"];
      const nameCells = await page
        .locator(
          'h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)'
        )
        .allTextContents();
      expect(nameCells).toEqual(names);
    });
  });

  test(" TestId008 - Validating content of dynamic table elements ", async ({
    page,
  }) => {
    await test.step("I can validate the dynamic content", async () => {
      // Get initial values
      const initialValues = await page
        .locator('h2:has-text("Tabla dinámica") + table tbody tr td')
        .allTextContents();
      console.log(initialValues);
      // Reload the page to get new values
      await page.reload();
      // Get new values
      const newValues = await page
        .locator('h2:has-text("Tabla dinámica") + table tbody tr td')
        .allTextContents();
      console.log(newValues);
      // Compare the two sets of values
      expect(initialValues).not.toEqual(newValues);
    });
  });

  /* To skip this test use the following command:
     npx playwright test --grep-invert "@skip-tag"
  */
  test(" TestId009 - Examples of Soft assertions @skip-tag ", async ({ page }) => {
    await test.step("validate checkboxes elements", async () => {
      await expect
        .soft(page.getByText("Pizza 🍕"), "Not found the element")
        .toBeVisible();
      await expect
        .soft(page.getByText("Helado 🍧"), "Not found the element")
        .toBeVisible();
      await expect
        .soft(page.getByText("Hamburguesa 🍔"), "Not found the element")
        .toBeVisible();
      await expect
        .soft(page.getByText("Pasta 🍝"), "Not found the element")
        .toBeVisible();
      await expect
        .soft(page.getByText("Torta 🍰"), "Not found the element")
        .toBeVisible();
        // Attach a screenshot to the test report
        await test.info().attach("screenshot", {
          body: await page.screenshot(),
          contentType: "image/png",
        });
    });
  });

  test(" TestId010 - Validate popup message @skip-tag ", async ({ page }) => {
    // Annotation for test management systems
    test.info().annotations.push({
      type: "issue",
      description: "This test is flaky, needs investigation",
    });
    await test.step("When I click on the Popup button", async () => {
      await page.getByRole("button", { name: "Mostrar popup" }).click();
    });
    await test.step("Then I should see the popup message", async () => {
      await expect(page.getByText("¿Viste? ¡Apareció un Pop-up!")).toHaveText(
        "¿Viste? ¡Apareció un Pop-up!"
      );
    });

    await test.step("When I close the popup", async () => {
      await page.getByRole("button", { name: "Cerrar" }).click();
    });

    await test.step("Then I should not see the popup message", async () => {
      await expect(
        page.getByText("¿Viste? ¡Apareció un Pop-up!")
      ).not.toBeVisible();
    });
  });
});
