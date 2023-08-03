import { Browser, chromium, Page, expect } from "@playwright/test";

import { test as setup } from "@playwright/test";

import userInfo from "../auth/users";

for (const user of userInfo) {
	setup(`Authenticate ${user.username}`, async ({ page }) => {
		const authFile = `auth/${user.username}.json`;
		
	});
}
