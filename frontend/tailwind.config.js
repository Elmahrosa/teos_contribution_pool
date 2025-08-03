/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Paths to all of your template files
    "./public/index.html",         // Include the main HTML file
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Custom primary color
        secondary: '#FBBF24', // Custom secondary color
        accent: '#3B82F6', // Custom accent color
        background: '#F9FAFB', // Custom background color
        text: '#111827', // Custom text color
      },
      spacing: {
        '128': '32rem', // Custom spacing value
        '144': '36rem', // Custom spacing value
      },
      borderRadius: {
        '4xl': '2rem', // Custom border radius
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugin for better form styles
    require('@tailwindcss/typography'), // Plugin for typography styles
    require('@tailwindcss/aspect-ratio'), // Plugin for aspect ratio utilities
  ],
  variants: {
    extend: {
      opacity: ['disabled'], // Enable opacity utilities for disabled states
      cursor: ['hover', 'focus'], // Enable cursor utilities for hover and focus states
    },
  },
};
