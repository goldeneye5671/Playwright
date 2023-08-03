import { Locator, expect } from "@playwright/test";
import { test } from "./fixtures/basePage";
import userInfo from "../auth/users";

test.describe("Test Section One", () => {
	test.use({ storageState: "auth/standard_user.json" });
	const sorts = [
		"Name (A to Z)",
		"Name (Z to A)",
		"Price (low to high)",
		"Price (high to low)",
	];
	for (const sort of sorts) {
		test(`Testing sort ${sort} with standard user`, async ({
			page,
			inventoryPage,
		}) => {
			await inventoryPage.goto();
			await inventoryPage.sortProducts({ sortBy: sort });
			// await expect(await inventoryPage.productSortContainerActive.innerText()).toBe("Name (Z to A)")
		});
	}

	test("Add item to cart, view it, and remove it", async ({ page, inventoryPage, shoppingCartPage }) => {
		await inventoryPage.goto();
		
        await inventoryPage.addProductToCart({
			itemName: "Sauce Labs Bolt T-Shirt",
		});
		
        await inventoryPage.visitCart();
        
        await expect(await shoppingCartPage.getItem({
            name: "Sauce Labs Bolt T-Shirt"
        })).toHaveCount(1)
        
        await shoppingCartPage.removeItem({
            name: "Sauce Labs Bolt T-Shirt"
        })

        await expect(await shoppingCartPage.getItem({
            name: "Sauce Labs Bolt T-Shirt"
        })).toHaveCount(0)
	});

    test("Add many items to cart, view them, then remove them", async ({page, inventoryPage, shoppingCartPage}) => {
        const itemsToBuy = [
            "Sauce Labs Bolt T-Shirt",
            "Sauce Labs Backpack",
            "Sauce Labs Onesie"
        ]

        await inventoryPage.goto()

        for (const item of itemsToBuy) {
            await inventoryPage.addProductToCart({itemName: item})
        }

        await inventoryPage.visitCart()

        await expect(await shoppingCartPage.cartItems).toHaveCount(itemsToBuy.length)

        let count = itemsToBuy.length
        for (const item of itemsToBuy) {
            await shoppingCartPage.removeItem({name: item})
            count--;
            await expect(await shoppingCartPage.cartItems).toHaveCount(count)
        }
    })

    test("Follow checkout path", async ({page, inventoryPage, shoppingCartPage, checkoutPage}) => {
        const itemsToBuy = [
            "Sauce Labs Bolt T-Shirt",
            "Sauce Labs Backpack",
            "Sauce Labs Onesie"
        ]

        await inventoryPage.goto()

        for (const item of itemsToBuy) {
            await inventoryPage.addProductToCart({itemName: item})
        }

        await inventoryPage.visitCart()

        await expect(await shoppingCartPage.cartItems).toHaveCount(itemsToBuy.length)

        await shoppingCartPage.checkoutButton.click()

        await checkoutPage.enterFirstName({firstName: "Johnny"})
        await checkoutPage.enterLastName({lastName: "Test"})
        await checkoutPage.enterPostalCode({postalCode: "47403"})
        await checkoutPage.continueCheckout()
    })

	// test.use({storageState: "auth/performance_glitch_user.json"})
	// test("Testing sort with performance glitch user", async ({page, inventoryPage}) => {
	//     await inventoryPage.goto()
	//     await inventoryPage.sortProducts({sortBy: "Price (low to high)"})
	// })

	// test.use({storageState: "auth/problem_user.json"})
	// test("Testing sort with problem user", async ({page, inventoryPage}) => {
	//     await inventoryPage.goto();
	//     await inventoryPage.sortProducts({sortBy: "Price (high to low)"})
	// })

	// for (const user of userInfo) {
	//     test.use({storageState: `auth/${user.username}.json`})
	//     test(`testing sort with user ${user.username}`, async ({page, inventoryPage}) => {
	//         await inventoryPage.goto()
	//         await inventoryPage.sortProducts({sortBy: "Price (low to high)"})
	//     })
	// }
});
