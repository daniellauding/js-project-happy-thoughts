/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind where to look for class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class (manual toggle + system preference)
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--body-font-family)"],
        number: ["var(--number-font-family)"],
      },
      boxShadow: {
        pop: "8px 7px 0px var(--tw-shadow-color, rgba(0,0,0,1))",
      },
    },

  },
  plugins: [],
}
