export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    components: {
      Slider: {
        dotBorderColor: "#ED640F",
      },
    },
    screens: {
      xxs: "320px",
      xs: " 375px",
      s: "425px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
      "3xl": "1536px",
      "4xl": "1920px",
    },
    fontFamily: {
      sans: ["Archivo", "sans-serif"],
      archivo: ["Archivo", "sans-serif"],
      Mplus1p: ["Mplus1p", "Archivo"],
      Manrope: ["Manrope", "Archivo"],
    },
    extend: {
      backgroundImage: {
        auth: "url('/authPageBackground.png')",
      },
    },
  },
  plugins: [],
};
