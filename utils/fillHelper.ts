// utils/fillHelper.ts
import { Page, Locator } from "@playwright/test";

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
