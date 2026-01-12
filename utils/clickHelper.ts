// utils/clickHelper.ts
import { Page, Locator } from "@playwright/test";

/**
 * Clicks an element after waiting for it to be visible, with logging.
 *
 * @param {Page} page - Playwright Page instance.
 * @param {string | Locator} selector - Element selector or Locator.
 * @param {string} [description="element"] - Optional description for logging.
 * @returns {Promise<void>} Resolves on successful click, throws on failure.
 *
 * @example
 * await customClick(page, "#submit-button", "Submit Button");
 */

export async function customClick(
    page: Page,
    selector: string | Locator,
    description: string = "element",
): Promise<void> {
    try {
        const element =
            typeof selector === "string" ? page.locator(selector) : selector;

        console.log(`🔍 Waiting for ${description} to be visible...`);
        await element.waitFor({ state: "visible", timeout: 5000 });

        console.log(`🖱️ Clicking on ${description}...`);
        await element.click({ timeout: 5000 });

        console.log(`✅ Clicked on ${description}`);
    } catch (error) {
        console.error(`❌ Failed to click on ${description}:`, error);
        throw error; // Re-throw so Playwright knows the test failed
    }
}
