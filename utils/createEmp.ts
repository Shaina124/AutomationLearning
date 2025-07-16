import { Page } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { utcTime } from "./utcTime";
import { customClick } from "../utils/clickHelper";
import { customFill } from "../utils/fillHelper";
import { PIMPage } from "../page_objects/PIMPage";

/**
 * Creates a new employee in the HRM system using Playwright.
 *
 * This function generates a unique employee using Faker for first and last names,
 * and a UTC-based ID. It navigates through the PIM module using custom wrappers
 * for clicking and filling form fields, following the Page Object Model (POM) structure.
 *
 * @param {Page} page - The Playwright Page instance used for interacting with the web page.
 * @returns {Promise<void>} Resolves once the employee creation steps are completed.
 *
 * @example
 * await createEmp(page);
 */

export async function createEmp(page: Page) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const employeeId = `emp_${utcTime()}`;

    const pimPage = new PIMPage(page); // Final ID is 10 characters

    await customClick(page, pimPage.getpimTab(), "PIM Tab");
    await customClick(page, pimPage.getaddEmployeeTab(), "Add Employee Tab");

    await customFill(
        page,
        pimPage.getFirstNameInput(),
        firstName,
        "First Name Input",
    );
    await customFill(
        page,
        pimPage.getLastNameInput(),
        lastName,
        "last Name Input",
    );
    await customFill(
        page,
        pimPage.getEmployeeIdInput(),
        employeeId,
        "Employee ID Input",
    );

    //return employeeId;
    console.log(`Created Employee ID: ${employeeId}`);
}
