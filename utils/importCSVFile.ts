import { Page } from "@playwright/test";
import path from "path";
import { generateCSVFile } from "./generateCSVFile";
import { ImportPage } from "../page_objects/ImportPage";
import { customClick } from "./clickHelper";

/**
 * Imports a generated CSV file into the OrangeHRM system.
 *
 * Generates the CSV, navigates to the import page, uploads the file,
 * and clicks the upload button.
 *
 * Uses POM and custom utilities for interaction.
 *
 * @param page Playwright Page instance
 * @throws Exception if the upload fails
 */

export async function importCSVFile(page: Page) {
    generateCSVFile();

    await page.goto(
        "https://opensource-demo.orangehrmlive.com/web/index.php/pim/pimCsvImport",
    );

    const importPage = new ImportPage(page);

    // Upload CSV file
    const filePath = path.resolve(__dirname, "../data/importData.csv");
    const fileInput = page.locator("input[type='file']");
    await fileInput.setInputFiles(filePath);

    const importButton = importPage.getUploadCSVButton();
    //const importButton = page.getByRole("button", { name: "Upload" });
    await customClick(page, importButton, "Upload Button");
    //await importButton.click();

    console.log("📁 CSV imported successfully.");
}
