/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#001f3f', // Customize this value to your desired Navy color
        yellow: '#FFDC00', // Customize this value to your desired Yellow color
      },
    },
  },
  plugins: [],
}

