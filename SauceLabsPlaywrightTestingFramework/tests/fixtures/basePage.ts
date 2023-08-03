import { test as base } from "@playwright/test"
import InventoryPage from "../pages/inventory.page"
import ShoppingCartPage from "../pages/shoppingCartPage"
import Product from "../pages/product.page"
import Checkout from "../pages/checkout.page"
import Login from "../pages/login.page"

export const test = base.extend<{
    inventoryPage: InventoryPage;
    shoppingCartPage: ShoppingCartPage;
    productPage: Product;
    checkoutPage: Checkout;
    loginPage: Login;
}>({
    inventoryPage: async ({page}, use) => {
        await use(new InventoryPage(page))
    },
    shoppingCartPage: async ({page}, use) => {
        await use(new ShoppingCartPage(page))
    },
    productPage: async ({page}, use) => {
        await use(new Product(page))
    }, 
    checkoutPage: async ({page}, use) => {
        await use(new Checkout(page))
    },
    loginPage: async ({page}, use) => {
        await use(new Login(page))
    }  
})
