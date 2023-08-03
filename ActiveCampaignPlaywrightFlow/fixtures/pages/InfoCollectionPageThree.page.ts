import { Locator, Page } from "@playwright/test";
import { Faker, en } from "@faker-js/faker";

export default class InfoCollectionPageThree {
	page: Page;

	readonly password: Locator;
	readonly nextStepButton: Locator;
	readonly faker: Faker;

	constructor(page: Page) {
		this.page = page;
		this.password = page.getByLabel("Password");
		this.nextStepButton = page.getByRole("button", {
			name: "Take Me To My Account",
		});
		this.faker = new Faker({ locale: en });
	}

	async fillPassword(password?: string) {
		password
			? await this.password.type(password)
			: await this.password.type(this.faker.internet.password());
	}
}
