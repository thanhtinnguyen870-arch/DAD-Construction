/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#CBA135", // Vàng đồng
        secondary: "#1A1A1A", // Đen than
        light: "#F5F5F5",
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
