/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#e9dfc4',
        'brand-primary': '#7b011e',
        'tbright': '#f5f1e6',
        'tdark': '#7b011e',
        'torange': '#fed7aa',
      }
    },
  },
  plugins: [],
}