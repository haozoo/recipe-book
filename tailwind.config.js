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
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
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
      lineHeight: {
        'extra-loose': '2.5',
        '12': '3rem',
        '14': '3.5rem',
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};