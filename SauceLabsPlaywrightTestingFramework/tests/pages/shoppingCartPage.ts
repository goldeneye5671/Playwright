import { Locator, Page, expect } from "@playwright/test";

export default class ShoppingCartPage {
    page: Page
    
    readonly continueShoppingButton
    readonly checkoutButton
    readonly cartItems

    constructor(page: Page) {
        this.page = page
        this.checkoutButton = this.page.getByTestId("checkout")
        this.continueShoppingButton = this.page.getByTestId("continue-shopping")
        this.cartItems = this.page.locator(".cart_item")
    }

    public async removeItem(options: {name: string}) {
        const item:Locator = await this.getItem(options)
        await item.getByRole("button").filter({hasText: "Remove"}).click()
        // you could do a check here but I think it would be better to keep checks in the test file itself uless the test
        // is repeated
    }

    public async getItem(options: {name: string}) {
        return this.cartItems.filter({hasText: options.name})
    }
}
