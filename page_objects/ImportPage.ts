import { BasePage } from "./baseObjects";
import path from "path";
import { generateCSVFile } from "../utils/generateCSVFile";

export class ImportPage extends BasePage {
    async importCSV() {
        generateCSVFile();

        await this.page.goto(
            "https://opensource-demo.orangehrmlive.com/web/index.php/pim/pimCsvImport",
        );

        const filePath = path.resolve(__dirname, "../data/importData.csv");
        const fileInput = this.page.locator("input[type='file']");
        await fileInput.setInputFiles(filePath);

        await this.clickElement(
            this.page.getByRole("button", { name: "Upload" }),
            "Upload button",
        );

        console.log("📁 CSV imported successfully.");
    }
}
