import { type Page, type  Locator, expect } from "@playwright/test";

export class SanboxPage {
  readonly page: Page;
  readonly generateIdButton: Locator;
  readonly textIdDynamic: Locator;
  readonly textBoxInput: Locator;
  readonly checkBox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.generateIdButton = page.getByRole("button", {name: "Hacé click para generar un ID"});
    this.textIdDynamic = page.getByText("OMG, aparezco después de 3");
    this.textBoxInput = page.getByRole("textbox", { name: "Un aburrido texto" });
    this.checkBox = page.getByRole("checkbox", { name: "Pizza 🍕" });
  }

  async clickOnGenerateId() {
    await expect(this.generateIdButton).toBeVisible();
    await this.generateIdButton.click();
  }

  async checkTextIdDynamic() {
    await expect(this.textIdDynamic).toBeVisible();
  }

  async fillTextInput(textToCheck: string) {
    await expect(this.textBoxInput, 'Text input is not visible').toBeVisible();
    await this.textBoxInput.fill(textToCheck);
  }

  async selectCheckBox() {
    await expect(this.checkBox).toBeVisible();
    await this.checkBox.check();
  }
}

