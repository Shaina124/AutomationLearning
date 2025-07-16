import { test } from "@playwright/test";
import { login } from "../utils/login";

/**
 * Basic test suite for employee-related tests.
 *
 * Includes a test for logging into the application.
 */

test.describe("Login to OrangeHRM", () => {
    test("Login to OrangeHRM", async ({ page }) => {
        await login(page);
    });
});
