import { Locator, Page, expect } from "@playwright/test";

export default class checkout {
    page: Page
    
    cancelButton: Locator
    checkoutButton: Locator;
    cartCalc: Locator;
    items: Locator
    payment: Locator;
    shipping: Locator;

    constructor(page: Page) {
        this.page = page
    }
}
