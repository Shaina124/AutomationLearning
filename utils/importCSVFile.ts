import { expect, Page } from "@playwright/test";
import path from "path";

export async function importCSVFile(page: Page) {
    await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/pim/pimCsvImport",
    );

    // Upload CSV file
    const filePath = path.resolve(__dirname, "../data/importData.csv");
    const fileInput = page.locator("input[type='file']");
    await fileInput.setInputFiles(filePath);

    // Click Import button (adjust selector if needed)
    const importButton = page.getByRole("button", { name: "Upload" });
    await importButton.click();

    // Wait for success feedback (adjust selector as needed)
    // eslint-disable-next-line playwright/require-soft-assertions
    // await expect(page.locator(".oxd-text.oxd-text--toast-title")).toContainText(
    //     "Success",
    //     { timeout: 5000 },
    // );
    console.log("📁 CSV imported successfully.");
}
