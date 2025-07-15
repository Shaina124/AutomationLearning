import { Page } from "@playwright/test";
import path from "path";
import { generateCSVFile } from "./generateCSVFile";
import { ImportPage } from "../page_objects/ImportPage";
import { customClick } from "./clickHelper";

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
