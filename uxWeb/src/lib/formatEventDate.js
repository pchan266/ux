// Parsed as UTC: `new Date("2025-02-15")` is UTC midnight, which formats as the
// 14th for anyone west of Greenwich.
export function formatEventDate(date) {
  if (!date) return "";

  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
