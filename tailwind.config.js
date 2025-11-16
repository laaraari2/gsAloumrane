// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        arabic: ['"Cairo"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Add your light mode colors here
        light: {
          primary: '#4f46e5',
          secondary: '#7c3aed',
          background: '#ffffff',
          text: '#1f2937',
        },
      },
    },
  },
  plugins: [],
};
