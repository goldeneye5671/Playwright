import { Locator, Page, expect } from "@playwright/test";

export default class Checkout {


    page: Page

    firstNameInput: Locator;
    lastNameInput: Locator;
    postalCodeInput: Locator;
    continueButton: Locator;
    cancelButton: Locator;

    constructor(page: Page) {
        this.page = page

        this.firstNameInput = page.getByTestId("firstName")
        this.lastNameInput = page.getByTestId("lastName");
        this.postalCodeInput = page.getByTestId("postalCode")

        this.continueButton = page.getByTestId("continue")
        this.cancelButton = page.getByTestId("cancel")
   }

   async enterFirstName (options: {firstName: string}) {
        await this.firstNameInput.fill(options.firstName)
   }

   async enterLastName (options: {lastName: string}) {
        await this.lastNameInput.fill(options.lastName)
   }

   async enterPostalCode (options: {postalCode: string}) {
        await this.postalCodeInput.fill(options.postalCode)
   }

   async continueCheckout () {
        await this.continueButton.click()
   }

   async cancelCheckout () {
    await this.cancelButton.click()
   }

}
