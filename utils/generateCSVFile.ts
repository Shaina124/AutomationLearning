import { faker } from "@faker-js/faker";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { utcTime } from "./utcTime";

export function generateEmployeeCSV(count: number = 59): void {
    const headers = [
        "first_name",
        "middle_name",
        "last_name",
        "employee_id",
        "other_id",
        "driver's_license_no",
        "license_expiry_date",
        "gender",
        "marital_status",
        "nationality",
        "date_of_birth",
        "address_street_1",
        "address_street_2",
        "city",
        "state/province",
        "zip/postal_code",
        "country",
        "home_telephone",
        "mobile",
        "work_telephone",
        "work_email",
        "other_email",
    ];

    const rows: string[] = [];

    for (let i = 0; i < count; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const employeeId = `ab${(i + 1).toString().padStart(2, "0")}-${utcTime()}`;

        const row = [
            `${firstName}`, // first_name
            "", // middle_name
            `${lastName}`, // last_name
            employeeId, // employee_id
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
        ].join(",");

        rows.push(row);
    }

    const csvContent = [headers.join(","), ...rows].join("\n");

    const dir = path.resolve(__dirname, "../data");
    if (!existsSync(dir)) {
        mkdirSync(dir);
    }

    const filePath = path.resolve(dir, "employees.csv");
    writeFileSync(filePath, csvContent);
    console.log(
        `✅ CSV file generated with ${count} employees at: ${filePath}`,
    );
}
