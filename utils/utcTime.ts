export function utcTime(): string {
    const timestamp = Date.now(); // milliseconds since 1970 UTC
    return timestamp.toString(36).padStart(6, "0").slice(-6); // 6 chars
}
