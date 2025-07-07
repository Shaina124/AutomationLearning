import { BasePage } from "./baseObjects";
import { utcTime } from "../utils/utcTime";
import { faker } from "@faker-js/faker";

export class PIMPage extends BasePage {
    async goToEmployeeList() {
        await this.clickElement("text=PIM", "PIM tab");
        await this.clickElement("text=Employee List", "Employee List tab");
    }

    async goToAddEmployee() {
        await this.clickElement("text=PIM", "PIM tab");
        await this.clickElement("text=Add Employee", "Add Employee tab");
    }

    async createEmployee(): Promise<string> {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const employeeId = `emp_${utcTime()}`;

        await this.fillInput(
            this.page.getByPlaceholder("First Name"),
            firstName,
        );
        await this.fillInput(this.page.getByPlaceholder("Last Name"), lastName);
        await this.fillInput(
            this.page.locator("form").getByRole("textbox").nth(4),
            employeeId,
        );

        return employeeId;
    }

    async saveEmployee() {
        await this.clickElement(
            this.page.getByRole("button", { name: "Save" }),
            "Save button",
        );
    }

    async searchEmployeeById(id: string) {
        await this.page.getByRole("textbox").nth(2).fill(id);
        await this.clickElement("button:has-text('Search')", "Search button");
    }

    async deleteFirstEmployeeResult() {
        await this.page.locator(".oxd-icon.bi-trash").first().click();
        await this.page
            .getByRole("button", { name: "\uF5DE Yes, Delete" })
            .click();
    }

    async clickEditFirstEmployee() {
        await this.page
            .locator(".oxd-icon.bi-pencil-fill")
            .first()
            // eslint-disable-next-line playwright/no-force-option
            .click({ force: true });
    }

    async updateFirstName(newName: string) {
        await this.fillInput(this.page.getByPlaceholder("First Name"), newName);
    }

    async confirmEditSave() {
        await this.page
            .locator("form")
            .filter({ hasText: "Employee Full" })
            .getByRole("button")
            .click();
    }
}
