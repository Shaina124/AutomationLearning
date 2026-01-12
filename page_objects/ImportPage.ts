import { basePage } from "./basePage";
import { Page, Locator } from "@playwright/test";

export class ImportPage extends basePage {
    private page: Page;
    constructor(page: Page) {
        super();
        this.page = page;
    }
    getUploadCSVButton(): Locator {
        return this.page.getByRole("button", { name: "Upload" });
    }
}
