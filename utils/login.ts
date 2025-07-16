import { Page } from "@playwright/test";
import { LoginPage } from "../page_objects/loginPage"; // adjust path if needed
import { customFill } from "./fillHelper";
import { customClick } from "./clickHelper";

/**
 * Logs into OrangeHRM with admin credentials.
 *
 * Navigates to login page, fills credentials, and clicks login.
 * Uses POM and custom utility wrappers.
 *
 * @param page Playwright Page instance
 * @throws Exception if any step fails
 */

export async function login(page: Page) {
    const loginPage = new LoginPage(page);
    await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    await customFill(
        page,
        loginPage.getUsernameInput(),
        "Admin",
        "Username Input",
    );
    await customFill(
        page,
        loginPage.getPasswordInput(),
        "admin123",
        "Password Input",
    );
    await customClick(page, loginPage.getLoginButton(), "Login Button");
}
