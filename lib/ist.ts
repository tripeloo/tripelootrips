/** Returns true during 10:00–22:59 IST (business hours “10 AM–10 PM”). */
export function isWithinCallWindowIST(date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: false,
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? NaN);
  if (Number.isNaN(hour)) return false;
  return hour >= 10 && hour <= 22;
}
