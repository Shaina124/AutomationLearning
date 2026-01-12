// utils/fillHelper.ts
import { Page, Locator } from "@playwright/test";

/**
 * Custom wrapper for filling input fields in Playwright.
 *
 * Waits for the target element to become visible, then fills it with the provided value.
 * Logs each step to the console for better traceability and debugging.
 *
 * @param {Page} page - The Playwright Page instance.
 * @param {string | Locator} selector - The input field to fill, provided as a string selector or a Locator object.
 * @param {string} value - The value to be entered into the input field.
 * @param {string} [description="input field"] - Optional description used in log messages for clarity.
 * @returns {Promise<void>} Resolves when the field is successfully filled, otherwise throws an error.
 *
 * @example
 * await customFill(page, "#first-name", "John", "First Name Input");
 * await customFill(page, page.locator("input[name='email']"), "test@example.com", "Email Field");
 */
export async function customFill(
    page: Page,
    selector: string | Locator,
    value: string,
    description: string = "input field",
): Promise<void> {
    try {
        const element =
            typeof selector === "string" ? page.locator(selector) : selector;

        console.log(`🔍 Waiting for ${description} to be visible...`);
        await element.waitFor({ state: "visible", timeout: 5000 });

        console.log(`⌨️ Filling ${description} with value: "${value}"...`);
        await element.fill(value, { timeout: 5000 });

        console.log(`✅ Successfully filled ${description}`);
    } catch (error) {
        console.error(`❌ Failed to fill ${description}:`, error);
        throw error;
    }
}
