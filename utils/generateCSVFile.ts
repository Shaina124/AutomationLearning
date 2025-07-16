import fs from "fs";
import path from "path";
import { faker } from "@faker-js/faker";
import { utcTime } from "./utcTime";

/**
 * Generates a CSV file with fake employee data using Faker.
 *
 * @param {number} [recordCount=55] - Number of records to generate.
 * @returns {void}
 *
 * @example
 * generateCSVFile(100);
 */

export function generateCSVFile(recordCount = 55) {
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

    for (let i = 0; i < recordCount; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const employeeId = `${utcTime()}${i.toString(36)}`;

        // Fill required fields, leave others empty
        const row = [
            firstName, // first_name
            "", // middle_name
            lastName, // last_name
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

    const filePath = path.resolve(__dirname, "../data/importData.csv");
    fs.writeFileSync(filePath, csvContent);

    console.log(
        `✅ CSV file generated with ${recordCount} records at ${filePath}`,
    );
}
