import { Locator, Page, expect } from "@playwright/test";

export default class Product {
    
    page: Page

    addToCartButton: Locator
    removeFromCartButton:Locator
    backToProducts: Locator;


    constructor(page: Page) {
        this.page = page;

        this.addToCartButton = page.getByRole("button").filter({hasText: "Add to cart"})
        this.removeFromCartButton = page.getByRole("button").filter({hasText: "Remove"})
        this.backToProducts = page.getByTestId("back-to-products")
    }
}
