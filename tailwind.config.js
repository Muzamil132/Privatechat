const colors = require("tailwindcss/colors");
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pdark: "#121212",
        sdark: "#242424",
        textdark: "#ffffff",
        bubble: "#a65fec",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
