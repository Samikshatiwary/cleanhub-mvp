export const required = (v) => !v || (typeof v === "string" && v.trim() === "");
export const minLen = (v, n) => (v || "").toString().trim().length < n;
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
export const isPositiveNumber = (v) => !isNaN(Number(v)) && Number(v) > 0;