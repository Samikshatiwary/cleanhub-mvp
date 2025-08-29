export function formatDate(input) {
  if (!input) return "";
  const d = new Date(input);
  return d.toLocaleString();
}
export function formatINR(value) {
  const n = Number(value || 0);
  return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}