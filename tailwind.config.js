/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
};
