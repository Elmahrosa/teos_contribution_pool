/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Custom primary color
        secondary: '#FBBF24', // Custom secondary color
        background: '#F9FAFB', // Custom background color
        text: '#111827', // Custom text color
      },
    },
  },
  plugins: [],
}
