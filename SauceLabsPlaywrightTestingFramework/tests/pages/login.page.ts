import { Locator, Page, expect } from "@playwright/test";

export default class Login {


    page: Page

    constructor(page: Page) {
        this.page = page
    }

}
