/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "100%", //for sidebar layout
        "sidebar-collapsed": "64px auto", //for collapsed sidebar layout
      },
    },
  },
  plugins: [],
};
