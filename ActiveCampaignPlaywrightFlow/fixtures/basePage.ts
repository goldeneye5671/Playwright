import { test as base } from "@playwright/test";
import Free from "./pages/free.page";
import InfoCollectionPageOne from "./pages/InfoCollectionPageOne.page";
import InfoCollectionPageTwo from "./pages/InfoCollectionPageTwo.page";
import InfoCollectionPageThree from "./pages/InfoCollectionPageThree.page";

export const test = base.extend<{
	freePage: Free;
	infoCollectionPageOne: InfoCollectionPageOne;
	infoCollectionPageTwo: InfoCollectionPageTwo;
	infoCollectionPageThree: InfoCollectionPageThree;
}>({
	freePage: async ({ page }, use) => {
		await use(new Free(page));
	},
	infoCollectionPageOne: async ({page}, use) => {
		await use(new InfoCollectionPageOne(page))
	},
	infoCollectionPageTwo: async ({page}, use) => {
		await use(new InfoCollectionPageTwo(page))
	},
	infoCollectionPageThree: async ({page}, use) => {
		await use(new InfoCollectionPageThree(page))
	}
});
