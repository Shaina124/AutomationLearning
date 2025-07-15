import { Page, Locator } from "@playwright/test";
import { basePage } from "./basePage";

export class PIMPage extends basePage {
    private page: Page;
    constructor(page: Page) {
        super();
        this.page = page;
    }
    getpimTab(): Locator {
        return this.page.getByRole("link", { name: "PIM" });
    }

    getemployeeListTab(): Locator {
        return this.page.getByRole("link", { name: "Employee List" });
    }

    getaddEmployeeTab(): Locator {
        return this.page.getByRole("link", { name: "Add Employee" });
    }

    getFirstNameInput(): Locator {
        return this.page.getByPlaceholder("First Name");
    }
    getLastNameInput(): Locator {
        return this.page.getByPlaceholder("Last Name");
    }

    getEmployeeIdInput(): Locator {
        return this.page.locator("form").getByRole("textbox").nth(4);
    }

    getSaveButton(): Locator {
        return this.page.getByRole("button", { name: "Save" });
    }

    getPersonalDetailsHeading(): Locator {
        return this.page.getByRole("heading", { name: "Personal Details" });
    }

    getEmployeeListTab(): Locator {
        return this.page.getByRole("link", { name: "Employee List" });
    }

    getSearchEmployeeIdInput(): Locator {
        return this.page.getByRole("textbox").nth(2);
    }

    getSearchButton(): Locator {
        return this.page.getByRole("button", { name: "Search" });
    }

    getEditButton(): Locator {
        return this.page.locator(".oxd-icon.bi-pencil-fill").nth(0);
    }

    getDeleteButton(): Locator {
        return this.page.locator(".oxd-icon.bi-trash").nth(0);
    }

    getConfirmDeleteButton(): Locator {
        return this.page.getByRole("button", { name: " Yes, Delete" });
    }
}
