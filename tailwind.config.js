/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        text: {
          primary: "#000000",
          secondary: "#F2CA99",
          tertiary: "#D98C5F",
        },
        background: {
          primary: "#A63740",
          secondary: "#592525",
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
};
