import { Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { utcTime } from "./utcTime";

export async function createEmp(page: Page) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const employeeId = `emp_${utcTime()}`; // Final ID is 10 characters

    await page.getByRole("link", { name: "PIM" }).click();
    await page.getByRole("link", { name: "Add Employee" }).click();

    await page.getByPlaceholder("First Name").fill(firstName);
    await page.getByPlaceholder("Last Name").fill(lastName);
    await page.locator("form").getByRole("textbox").nth(4).fill(employeeId);

    //return employeeId;
    console.log(`Created Employee ID: ${employeeId}`);
}
