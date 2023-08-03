import { Locator, expect } from "@playwright/test";
import { test } from "../../fixtures/basePage";

test.describe("Trial Flow -> new user", () => {
	test("Happy Path", async ({
		page,
		freePage,
		infoCollectionPageOne,
		infoCollectionPageTwo,
		infoCollectionPageThree,
	}) => {
		await freePage.goto();
		await freePage.goto();
		await expect(page).toHaveURL("/free");

		await freePage.fillEmail();
		await freePage.createAccountButton.click();

		await expect(page).toHaveURL("/onboarding/name/?trialrequested=1");

		await infoCollectionPageOne.fillName();
		await infoCollectionPageOne.fillPhoneNumber("7163431802");
		await infoCollectionPageOne.page.locator("main").click();
		await infoCollectionPageOne.nextStepButton.click();

		await expect(page).toHaveURL("/onboarding/business/");

		await page.waitForLoadState("networkidle");
		await infoCollectionPageTwo.selectContracts("500 - 1,000");
		await infoCollectionPageTwo.selectEmployees("250+");
		await infoCollectionPageTwo.selectBusiness("Accounting / Financial");
		await infoCollectionPageTwo.selectMarketingOption("Salesforce");
		await infoCollectionPageTwo.nextStepButton.click();

		await expect(page).toHaveURL("/onboarding/password/");

		await infoCollectionPageThree.fillPassword("TestPassword123!");
		await infoCollectionPageThree.nextStepButton.click();

		await expect(page).toHaveURL("/onboarding/complete");
	});

	// Limits to 32 characters
	// Needs to have @ and a domain
	// Name is alphabetic and limited to 64 characters
	test("Invalid Email", async ({ page, freePage }) => {

		let invalidEmails: string[] = [
			"invalid.email@googlecom",
			"invalid.email2gmail.com",
			"jksadlfasjfklasd;f;'",
			"@google.com",
			"Jane.doe@test",
			"!hello@google.com",
			"hello@google.com!",
		];

		await freePage.goto();

		for (const email of invalidEmails) {
			await freePage.fillEmail(email);
			await freePage.createAccountButton.click();
			await expect.soft(freePage.invalidEmail).toBeVisible();
			await freePage.emailAddressInput.clear();
			await expect.soft(freePage.invalidEmail).toBeHidden();
		}
	});

	test("Invalid Name", async ({ page, freePage, infoCollectionPageOne }) => {
		let invalidNames = [
			"Jane",
			"Jane ",
			"#$%^&*(!",
			"Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetzs",
			"Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetzss",
		];

		await freePage.goto();
		await freePage.fillEmail();
		await freePage.createAccountButton.click();
		await infoCollectionPageOne.fillPhoneNumber();

		for (const name of invalidNames) {
			await infoCollectionPageOne.fillName(name);
			await expect(infoCollectionPageOne.nextStepButton).toBeDisabled();
			await infoCollectionPageOne.name.clear();
		}
		// No Space or special characters
		// Over X Chars
	});

	//alphanumaric, but should  only allow for "+", "()", "-"
	test("Invalid Phone Number", async ({
		page,
		freePage,
		infoCollectionPageOne,
	}) => {
		let invalidNumbers = [
			"#*%&#(@",
			"ABsdEFg",
			"+81254567899",
			"+812545678",
			"+1 (812) 343-1802-",
			"+1 (812) 343-180",
			"(181) 234-31802",
			"812) 343-1802-",
			"812-343-1802-",
		];

		await freePage.goto();
		await freePage.fillEmail();
		await freePage.createAccountButton.click();
		await infoCollectionPageOne.fillName();

		for (const number of invalidNumbers) {
			await infoCollectionPageOne.fillPhoneNumber(number);
			await expect(infoCollectionPageOne.nextStepButton).toBeDisabled();
			await infoCollectionPageOne.phoneNumber.clear();
		}
	});

	// Minimum of 6 chars, with one capital and one punctuation
	test("Invalid Password", async ({
		page,
		freePage,
		infoCollectionPageOne,
		infoCollectionPageTwo,
		infoCollectionPageThree,
	}) => {
		let invalidPasswords = [
			"",
			" ",
			"nopunct",
			"!*#$%",
			"ATestingPassword",
			
		];

		await freePage.goto();
		await freePage.fillEmail();
		await freePage.createAccountButton.click();

		await infoCollectionPageOne.fillName();
		await infoCollectionPageOne.fillPhoneNumber();
		await infoCollectionPageOne.nextStepButton.click();

		await page.waitForLoadState("networkidle");
		await infoCollectionPageTwo.selectContracts("500 - 1,000");
		await infoCollectionPageTwo.selectEmployees("250+");
		await infoCollectionPageTwo.selectBusiness("Accounting / Financial");
		await infoCollectionPageTwo.selectMarketingOption("Salesforce");
		await infoCollectionPageTwo.nextStepButton.click();

		for (let password of invalidPasswords) {
			await infoCollectionPageThree.fillPassword(password);
			await expect(infoCollectionPageThree.password).toHaveClass("dirty");
		}
	});

	// Make an account, then try to make another with the same email
	test("Duplicate Email", async () => {});
});
