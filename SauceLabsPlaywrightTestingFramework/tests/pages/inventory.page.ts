import { Locator, Page, expect } from "@playwright/test";

export default class InventoryPage {
	page: Page;

	readonly productSortContainer: Locator;
	readonly productSortContainerActive: Locator;
	readonly products: Locator;
	readonly shoppingCart: Locator;

	constructor(page: Page) {
		this.page = page;
		this.productSortContainer = this.page.getByTestId(`product_sort_container`);
		this.productSortContainerActive = this.page
			.locator(".select_container")
			.locator(".active_option");
		this.products = this.page.locator(".inventory_item");
		this.shoppingCart = this.page.locator(".shopping_cart_link");
	}

	public async goto() {
		await this.page.goto("/inventory.html");
	}

	public async sortProducts(options: { sortBy: string }) {
		await this.productSortContainer.selectOption(options.sortBy); //filter({hasText: options.sortBy}).click()
		await expect(await this.productSortContainerActive.innerText()).toBe(
			options.sortBy
		);
		return await this.products;
	}

	public async addProductToCart(options: { itemName: string }) {
		const filteredProducts: Locator = await this.products.filter({
			hasText: options?.itemName,
		});
		await filteredProducts.first().getByRole("button").click();
	}

	public async visitCart() {
		await this.shoppingCart.click();
	}
}
