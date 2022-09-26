/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      lora: ["Lora"],
      nunito: ["nunito"],
      gochi: ["Gochi Hand"],
      dekko: ["Dekko"],
      patrick: ["Patrick Hand"],
      architectsDaughter: ["Architects Daughter"],
    },
    extend: {
      colors: {
        dirt: "#A06A50",
        chestnut: "#292626",
        hazelnut: "#55433B",
        cultured: "#F8F7F5",
        lotion: "#FFFDFA",
        platinum: "#E3E2E1",
        rajah: "#FFAC59",
        sajah: "#d18b43",

        "blanched-almond": "#FFEFCA",
        "chrome-yellow": "#FFAC00",
        "floral-white": "#FFFAF0",
        "pale-silver": "#C3C0B9",
        "atomic-tangerine": "#FC8E57",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};