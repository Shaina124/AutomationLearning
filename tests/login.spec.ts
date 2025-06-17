import { test } from "@playwright/test";
import { login } from "../utils/login";

test.describe("Employee Tests", () => {
    test("Create employee test", async ({ page }) => {
        await login(page);
    });
});
