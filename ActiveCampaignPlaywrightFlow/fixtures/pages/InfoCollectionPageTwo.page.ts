import { Locator, Page } from "@playwright/test";
import { Faker, en } from "@faker-js/faker";

export default class InfoCollectionPageTwo {
	page: Page;

    readonly contracts: Locator;
    readonly employees: Locator;
    readonly business: Locator;
    readonly forCustomer: Locator
    readonly marketingOptions: Locator
    readonly nextStepButton: Locator

	constructor(page: Page) {
        this.page = page;
        this.contracts = page.getByRole('combobox', { name: 'How many contacts/prospects do you have?' })
        this.employees = page.getByRole('combobox', { name: 'How many employees do you have?' })
        this.business = page.getByRole('combobox', { name: 'What industry is your business in?' })
        this.forCustomer = page.getByRole("combobox", { name: "Is this account for one of your customers?" })
        this.marketingOptions = page.locator('#software-products #products_select div')
        this.nextStepButton = page.getByRole("button", {name: "Next Step"})
	}

    async selectContracts(amount: string) {
        await this.contracts.selectOption(amount)
    } 

    async selectEmployees(amount: string) {
        await this.employees.selectOption(amount)
    }

    async selectBusiness(industry: string) {
        await this.business.selectOption(industry)
    }

    async selectMarketingOption(name: string) {
        await this.marketingOptions.filter({hasText: name}).locator('div').click();
    }

}
