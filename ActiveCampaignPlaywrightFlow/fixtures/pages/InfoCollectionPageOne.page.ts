import { Locator, Page } from "@playwright/test";
import { Faker, en } from "@faker-js/faker";

export default class InfoCollectionPageOne {
	page: Page;

	name: Locator;
	phoneNumber: Locator;
    nextStepButton: Locator
	faker: Faker;

	constructor(page: Page) {
        this.page = page
        // NOTE: I Noticed the names for these are reversed. Please fix when possible
		this.name = page.getByPlaceholder("Enter your name");
		this.phoneNumber = page.getByPlaceholder("Enter your phone number");
        this.nextStepButton = page.getByRole('button', { name: 'Next Step' })
		this.faker = new Faker({ locale: en });
	}

	async fillName(name?: string) {
        await this.name.click()
		name
			? await this.name.type(name)
			: await this.name.type(
					`${this.faker.person.firstName()} ${this.faker.person.lastName()}`
			  );
	}

	async fillPhoneNumber(phoneNumber?: string) {
        await this.phoneNumber.click()
		phoneNumber
			? await this.phoneNumber.type(phoneNumber)
			: await this.phoneNumber.type(`${this.faker.phone.number("+1 (812) ###-####")}`);
	}
}
