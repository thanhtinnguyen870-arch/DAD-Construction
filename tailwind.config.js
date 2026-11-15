/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dad: {
          50: '#f0f6fd',
          100: '#dce8f9',
          200: '#bfd7f4',
          300: '#94beed',
          400: '#629ee3',
          500: '#3d81d8',
          600: '#2b66c4',
          700: '#0f3b68', // Primary Brand Navy
          800: '#1b417c',
          900: '#0a233f',
          950: '#07182c',
        },
        warm: {
          50: '#fdfbf7',   // Warm softest ivory white
          100: '#fbf7ee',  // Light cream yellow
          150: '#f7f1e1',  // Soft champagne
          200: '#f3ebd4',  // Light golden cream
          300: '#e8dcbe',  // Muted gold
          400: '#d9c59c',  // Warm sand gold
          500: '#c5ab73',  // Architectural gold
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
