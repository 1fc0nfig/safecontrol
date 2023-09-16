/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#81c04b",
        secondary: {
          100: "#333",
          200: "#444",
          }
        },
    },
  },
  plugins: [],
}

