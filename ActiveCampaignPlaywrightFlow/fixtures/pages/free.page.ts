import {Locator, Page} from "@playwright/test";
import { Faker, en } from "@faker-js/faker";

export default class Free {
    page: Page
    
    readonly emailAddressInput: Locator
    readonly createAccountButton: Locator
    readonly loginLink: Locator
    readonly invalidEmail: Locator
    readonly faker

    constructor(page: Page) {
        this.page = page
        this.faker = new Faker({locale: en})
        this.emailAddressInput = page.locator(`input[type="email"]`)
        this.createAccountButton = page.getByRole("button", {name: "Create Account"})
        this.loginLink = page.getByRole('link', { name: 'Log into your account here.' });
        this.invalidEmail = page.locator('#post-16160').getByText('Please enter a valid email address to continue.');
    }

    async fillEmail(email?: string) {
        if (email) {
            await this.emailAddressInput.type(email)
        } else {
            await this.emailAddressInput.type(this.faker.internet.email())
        }
    }

    async goto() {
        await this.page.goto("/free")
    }
}
