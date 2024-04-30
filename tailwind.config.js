/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
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
  plugins: [require("flowbite/plugin")],
});
