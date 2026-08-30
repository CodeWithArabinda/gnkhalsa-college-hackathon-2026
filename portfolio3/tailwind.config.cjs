/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#94a3b8",
        tertiary: "#0f172a",
        accent: "#915EFF",
        "black-100": "#0b0f24",
        "black-200": "#070a19",
        "white-100": "#f8fafc",
      },
      boxShadow: {
        card: "0px 20px 50px -10px rgba(145, 94, 255, 0.2)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
