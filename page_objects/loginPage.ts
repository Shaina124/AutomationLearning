import { Page, Locator } from "@playwright/test";
import { basePage } from "./basePage";

export class LoginPage extends basePage {
    private page: Page;
    constructor(page: Page) {
        super();
        this.page = page;
    }
    getUsernameInput(): Locator {
        return this.page.getByPlaceholder("Username");
    }

    getPasswordInput(): Locator {
        return this.page.getByPlaceholder("Password");
    }

    getLoginButton(): Locator {
        return this.page.getByRole("button", { name: "Login" });
    }
}
