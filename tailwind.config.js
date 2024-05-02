/** @type {import('tailwindcss').Config} */
// const withMT = require("@material-tailwind/react/utils/withMT");

// export default withMT({
//   content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       text: {
//         xl: "5rem",
//       },
//       colors: {
//         text: {
//           primary: "#000000",
//           secondary: "#F2CA99",
//           tertiary: "#D98C5F",
//         },
//         background: {
//           primary: "#A63740",
//           secondary: "#592525",
//         },
//       },
//     },
//   },
//   plugins: [],
// });
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
