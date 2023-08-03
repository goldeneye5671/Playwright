import { Browser, chromium, Page, expect } from "@playwright/test";

import { test as setup } from "@playwright/test";

import userInfo from "../auth/users";

for (const user of userInfo) {
	setup(`Authenticate ${user.username}`, async ({ page }) => {
		const authFile = `auth/${user.username}.json`;
		await page.goto("https://www.saucedemo.com/");
		await page.getByTestId("username").fill(user.username);
		await page.getByTestId("password").fill(user.password);
		await page.getByText(`Login`).click();
		await page.locator("#react-burger-menu-btn").click();
		await expect(page.locator("#logout_sidebar_link")).toBeVisible();
		//save the state of the site
		await page.waitForTimeout(1000);
		await page.context().storageState({ path: authFile });
		await page.close()
	});
}
