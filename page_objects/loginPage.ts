import { BasePage } from "./baseObjects";

export class LoginPage extends BasePage {
    async login(username: string, password: string) {
        await this.page.goto(
            "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
        );
        await this.fillInput(this.page.getByPlaceholder("Username"), username);
        await this.fillInput(this.page.getByPlaceholder("Password"), password);
        await this.clickElement(
            this.page.getByRole("button", { name: "Login" }),
            "Login button",
        );
    }
}
