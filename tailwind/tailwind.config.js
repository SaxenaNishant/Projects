/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        brightRed: "hsl(12 88% 59%)",
        brightLightRed: "hsl(12 88% 69%)",
        brightRedSupLight: "hsl(12 88% 95%)",
        darkBlue: "hsl(228 39% 23%)",
        darkGaryishBlue: "hsl(227 12% 61%)",
        veryDarkBlue: "hsl(223 12% 13%)",
        veryPaleRed: "hsl(0 100% 96%)",
        veryDarkGray: "hsl(0 0% 98%)",
      },
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
  },
  plugins: [],
};
