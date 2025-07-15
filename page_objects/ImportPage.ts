import { basePage } from "./basePage";
import { Page, Locator } from "@playwright/test";
// import path from "path";
// import { generateCSVFile } from "../utils/generateCSVFile";

export class ImportPage extends basePage {
    private page: Page;
    constructor(page: Page) {
        super();
        this.page = page;
    }
    getUploadCSVButton(): Locator {
        return this.page.getByRole("button", { name: "Upload" });
    }
    // async importCSV() {
    //     generateCSVFile();

    //     await this.page.goto(
    //         "https://opensource-demo.orangehrmlive.com/web/index.php/pim/pimCsvImport",
    //     );

    //     const filePath = path.resolve(__dirname, "../data/importData.csv");
    //     const fileInput = this.page.locator("input[type='file']");
    //     await fileInput.setInputFiles(filePath);

    //     await this.clickElement(
    //         this.page.getByRole("button", { name: "Upload" }),
    //         "Upload button",
    //     );

    //     console.log("📁 CSV imported successfully.");
    // }
}
