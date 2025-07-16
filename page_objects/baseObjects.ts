// import { Page, Locator } from "@playwright/test";

// export class BasePage {
//     readonly page: Page;

//     constructor(page: Page) {
//         this.page = page;
//     }

//     async navigate(url: string) {
//         await this.page.goto(url);
//     }

//     async clickElement(locator: Locator | string, description = "element") {
//         const element =
//             typeof locator === "string" ? this.page.locator(locator) : locator;
//         await element.waitFor({ state: "visible", timeout: 5000 });
//         await element.click();
//         console.log(`✅ Clicked on ${description}`);
//     }

//     async fillInput(locator: Locator, value: string) {
//         await locator.waitFor({ state: "visible", timeout: 5000 });
//         await locator.fill(value);
//     }

//     async waitForVisible(locator: Locator) {
//         await locator.waitFor({ state: "visible", timeout: 5000 });
//     }
// }
