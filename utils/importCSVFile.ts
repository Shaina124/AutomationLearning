import { expect, Page } from "@playwright/test";
import path from "path";
import { generateCSVFile } from "./generateCSVFile";

export async function importCSVFile(page: Page) {
    generateCSVFile();

    await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/pim/pimCsvImport",
    );

    // Upload CSV file
    const filePath = path.resolve(__dirname, "../data/importData.csv");
    const fileInput = page.locator("input[type='file']");
    await fileInput.setInputFiles(filePath);

    const importButton = page.getByRole("button", { name: "Upload" });
    await importButton.click();

    console.log("📁 CSV imported successfully.");
}
