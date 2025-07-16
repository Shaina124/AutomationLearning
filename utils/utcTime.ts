/**
 * Generates a 6-character base-36 UTC timestamp string.
 *
 * Converts current time in milliseconds to a compact unique ID.
 *
 * @return 6-char base-36 encoded UTC timestamp
 */

export function utcTime(): string {
    const timestamp = Date.now(); // milliseconds since 1970 UTC
    return timestamp.toString(36).padStart(6, "0").slice(-6); // 6 chars
}
