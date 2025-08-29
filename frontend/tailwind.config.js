module.exports = {
  content: ["./src//*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f6ff",
          100: "#ebedff",
          200: "#cfd6ff",
          400: "#8f9bff",
          500: "#6366f1", 
          700: "#3b3fb2",
        },
        glass: "rgba(255,255,255,0.04)",
      },
      boxShadow: {
        soft: "0 6px 18px rgba(8,10,22,0.06)",
      }
    },
  },
  plugins: [],
}